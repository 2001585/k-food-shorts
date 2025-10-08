import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Restaurant {
  id: string;
  name: string;
  description: string;
  contents: Array<{
    id: string;
    url: string;
    caption: string;
    likeCount: number;
  }>;
  reviewCount: number;
}

export default function FeedScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const dummyData: Restaurant[] = [
    {
      id: '1',
      name: '할머니의 손맛',
      description: '3대째 이어온 전통 한정식 전문점입니다.',
      contents: [{
        id: '1',
        url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=400&fit=crop',
        caption: '3대째 이어온 할머니의 손맛',
        likeCount: 89
      }],
      reviewCount: 189
    },
    {
      id: '2',
      name: '라멘 타로',
      description: '진정한 일본식 돈코츠 라멘을 선보입니다.',
      contents: [{
        id: '2',
        url: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&h=400&fit=crop',
        caption: '18시간 우린 진한 돈코츠 국물',
        likeCount: 156
      }],
      reviewCount: 389
    },
    {
      id: '3',
      name: '김치찌개 마을',
      description: '정통 김치찌개와 한국 가정식',
      contents: [{
        id: '3',
        url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=400&fit=crop',
        caption: '엄마 손맛 그대로, 진짜 김치찌개',
        likeCount: 234
      }],
      reviewCount: 145
    }
  ];

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      setLoading(true);
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRestaurants(dummyData);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeed();
    setRefreshing(false);
  };

  const toggleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const renderRestaurant = ({ item }: { item: Restaurant }) => {
    const content = item.contents[0];
    const isLiked = likedPosts.has(content.id);
    
    return (
      <View style={styles.postContainer}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Image 
            source={{ uri: `https://ui-avatars.com/api/?name=${item.name}&background=ea2a33&color=fff&size=32` }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.name}</Text>
        </View>

        {/* 메인 이미지 */}
        <Image 
          source={{ uri: content.url }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        {/* 액션 버튼들 */}
        <View style={styles.actions}>
          <View style={styles.leftActions}>
            <TouchableOpacity 
              onPress={() => toggleLike(content.id)}
              style={styles.actionButton}
            >
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isLiked ? "#ea2a33" : "#000"} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="paper-plane-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* 좋아요 수 */}
        <Text style={styles.likes}>
          {content.likeCount + (isLiked ? 1 : 0)} likes
        </Text>

        {/* 캡션 */}
        <View style={styles.caption}>
          <Text style={styles.captionText}>
            <Text style={styles.username}>{item.name}</Text> {content.caption}
          </Text>
        </View>

        {/* 댓글 보기 */}
        <TouchableOpacity>
          <Text style={styles.viewComments}>
            View all {item.reviewCount} comments
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>피드 로딩중... 🍽️</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.title}>K-Food Shorts</Text>
        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#000',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  feedContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  username: {
    fontWeight: '600',
    marginLeft: 10,
    color: '#000',
  },
  mainImage: {
    width: width,
    height: width,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  likes: {
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 5,
    color: '#000',
  },
  caption: {
    paddingHorizontal: 16,
    paddingTop: 2,
  },
  captionText: {
    color: '#000',
  },
  viewComments: {
    color: '#9ca3af',
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 10,
  },
});