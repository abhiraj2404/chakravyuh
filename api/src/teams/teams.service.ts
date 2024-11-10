import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { appConfig } from 'src/app.config';
import { UsersService } from 'src/users/users.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JoinTeamDto } from './dto/join-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './teams.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamsModel: Model<TeamDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(userId: string, createTeamDto: CreateTeamDto): Promise<Team> {
    const lead = await this.userService.findById(userId);
    if (lead.team) {
      throw new ForbiddenException('User already in a team');
    }
    const newTeam = new this.teamsModel({
      ...createTeamDto,
      lead: userId,
      ug: lead.ug,
    });
    const team = await newTeam.save();
    const user = await this.userService.findById(userId);
    user.team = newTeam.id;
    await user.save();
    return team;
  }

  async join(userId: string, joinTeamDto: JoinTeamDto): Promise<Team> {
    const team = await this.teamsModel.findOne({ joinCode: joinTeamDto.code });
    if (!team) {
      throw new ForbiddenException(`Invalid JoinCode`);
    }
    const user = await this.userService.findById(userId);

    if (user.team) {
      throw new ForbiddenException('User already in a team');
    }

    if (team.members && team.members.length >= appConfig.maxTeamSize - 1) {
      throw new ForbiddenException('Team is full');
    }

    if (user.ug !== team.ug) {
      throw new ForbiddenException('User not in same ug');
    }

    if (team.lead.toString() === userId) {
      throw new ForbiddenException('Lead can not join as a member');
    }

    user.team = team.id;
    await user.save();

    try {
      if (!team.members || team.members.length === 0) {
        team['members'] = [userId];
      }

      await team.save();
    } catch (e) {
      console.log(e);
      team['members'] = [userId];
      await team.save();
    }
    console.log('Joined team succesfully');
    return team;
  }

  async my(userId: string): Promise<Team> {
    const user = await this.userService.findById(userId);
    if (!user.team) {
      throw new NotFoundException('User not in a team');
    }
    const team = await this.teamsModel.findById(user.team).populate([
      { path: 'lead', select: 'fullName' },
      { path: 'members', select: 'fullName' },
    ]);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async findAll(): Promise<Team[]> {
    return this.teamsModel
      .find()
      .populate([
        { path: 'lead', select: 'fullName email' },
        { path: 'members', select: 'fullName email' },
      ])
      .exec();
  }

  async getLeaderboard(ug: number): Promise<Team[]> {
    return this.teamsModel
      .find({
        ug: ug,
      })
      .sort({ score: -1 })
      .populate('lead', 'fullName email')
      .exec();
  }

  async findAllIds(): Promise<string> {
    const ids = await this.teamsModel.find().select('_id').exec();

    const idStrings = ids.map((doc: { _id: any }) => doc._id.toString());
    return idStrings.join('\n');
  }

  async findById(id: string): Promise<TeamDocument> {
    const team = await this.teamsModel.findById(id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const updatedTeam = await this.teamsModel
      .findByIdAndUpdate(id, updateTeamDto, { new: true })
      .exec();
    if (!updatedTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return updatedTeam;
  }

  async remove(id: string): Promise<Team> {
    const removedTeam = await this.teamsModel.findByIdAndDelete(id).exec();
    if (!removedTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return removedTeam;
  }

  async validateTeams(teamIds: string[]): Promise<boolean> {
    const count = await this.teamsModel
      .countDocuments({ _id: { $in: teamIds } })
      .exec();
    return count === teamIds.length;
  }
}
