import { Controller, Get, Query, Param, UseGuards, Request } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetFeedDto } from './dto/get-feed.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get('feed')
  @UseGuards(JwtAuthGuard)
  async getFeed(@Request() req, @Query() getFeedDto: GetFeedDto) {
    return this.restaurantsService.getFeed(req.user.userId, getFeedDto);
  }

  @Get('search')
  async searchRestaurants(@Query('q') query: string) {
    return this.restaurantsService.searchRestaurants(query);
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string) {
    return this.restaurantsService.getRestaurant(id);
  }
}