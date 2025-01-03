import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Headers,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { URoles } from 'src/users/users.schema';
import { Challenge } from './challenges.schema';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { FlagSubmissionDto } from './dto/flag-submission.dto';
import { Public } from 'src/auth/public.decorator';
import { CreateScoreDto } from 'src/scores/dto/create-score.dto';
import { Score } from 'src/scores/scores.schema';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  scoresService: any;
  constructor(private readonly challengesService: ChallengesService) {}

  @Roles(URoles.superuser, URoles.admin)
  @Post()
  @ApiOperation({ summary: '[ADMIN] Create a challenge' })
  async create(
    @Req() req: Request,
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengesService.create(
      req['user'].id,
      createChallengeDto,
    );
  }

  @Roles(URoles.superuser, URoles.admin)
  @Get()
  @ApiOperation({ summary: '[ADMIN] Get all challenges' })
  async findAll(): Promise<Challenge[]> {
    return await this.challengesService.findAll();
  }

  @Roles(URoles.superuser, URoles.admin)
  @Get(':id')
  @ApiOperation({ summary: '[ADMIN] Find challenge by id' })
  async findOne(@Param('id') id: string): Promise<Challenge> {
    return await this.challengesService.findOne(id);
  }

  @Get('/me/done')
  @ApiOperation({ summary: 'Get all challenges done by participant' })
  async myDone(@Req() req: Request): Promise<Challenge[]> {
    return await this.challengesService.myDone(req['user'].id);
  }

  @Get('/me/todo')
  @ApiOperation({ summary: 'Get next challenge for participant' })
  async myTodo(@Req() req: Request): Promise<Challenge> {
    return await this.challengesService.myTodo(req['user'].id);
  }

  @Post('submit')
  @ApiOperation({
    summary: 'Participant can submit the flag they found for a  challenge',
  })
  async verifySubmission(
    @Req() req: Request,
    @Body() flagSubmission: FlagSubmissionDto,
  ): Promise<boolean> {
    return await this.challengesService.verifySubmission(
      req['user'].id,
      flagSubmission.challengeNo,
      flagSubmission.flag,
    );
  }

  @Post('mark/done')
  @ApiOperation({ summary: '[ADMIN] Mark a challenge as done' })
  async markDone(
    @Body() createScoreDto: CreateScoreDto,
    @Req() req: Request,
  ): Promise<boolean> {
    return await this.challengesService.markDone(
      req['user'].id,
      createScoreDto,
    );
  }

  @Public()
  @ApiOperation({
    summary:
      'Create a score entry associated with a team for a specific challenge using challenge API Key',
  })
  @Post('verify')
  async setScoreViaKey(
    @Body() createScoreDto: CreateScoreDto,
    @Headers('Authorization') apiKey: string,
  ): Promise<Score> {
    console.log(apiKey);
    return this.challengesService.createViaApiKey(apiKey, createScoreDto);
  }

  @Roles(URoles.superuser, URoles.admin)
  @Put(':id')
  @ApiOperation({
    summary:
      '[SUDO] Update challenge by id. Only the creator of challenge, or superuser can do this',
  })
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
    @Req() req: Request,
  ): Promise<Challenge> {
    return await this.challengesService.update(
      req['user'].id,
      id,
      updateChallengeDto,
    );
  }

  @Roles(URoles.superuser, URoles.admin)
  @Delete(':id')
  @ApiOperation({
    summary: '[SUDO] Delete challenge by id. (creator/superuser)',
  })
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Challenge> {
    return await this.challengesService.remove(req['user'].id, id);
  }
}
