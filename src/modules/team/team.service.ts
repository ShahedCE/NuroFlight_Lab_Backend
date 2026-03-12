import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TeamMember } from "src/database/entities/team-member.entity";
import { Repository } from "typeorm";
import { CreateTeamMemberDto } from "./dto/create-team-member.dto";
import { TeamGroup } from "src/common/enums/team-group.enum";
import { TeamTag } from "src/common/enums/team-tag.enum";
import { UpdateTeamMemberDto } from "./dto/update-team.dto";

@Injectable()
export class TeamService{

   constructor(
    @InjectRepository(TeamMember)
    private readonly teamRepo: Repository<TeamMember>
   ){}

   //For Public Routes
   // Public: get all team members
  async findAll(group?: TeamGroup, tag?: TeamTag): Promise<TeamMember[]> {
    const queryBuilder = this.teamRepo.createQueryBuilder('team');

    if (group) {
      queryBuilder.andWhere('team.group = :group', { group });
    }

    if (tag) {
      queryBuilder.andWhere('team.tags @> :tag', {
        tag: JSON.stringify([tag]),
      });
    }

    queryBuilder.orderBy('team.priority', 'ASC', 'NULLS LAST');
    queryBuilder.addOrderBy('team.createdAt', 'DESC');

    return await queryBuilder.getMany();
  }

  // Public: get single team member by slug
  async findOneBySlug(slug: string): Promise<TeamMember> {
    const teamMember = await this.teamRepo.findOne({
      where: { slug },
    });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    return teamMember;
  }


   //For Admin Routes
   //async CreateTeam
    async create(memberdata:CreateTeamMemberDto & {imageUrl:string}):Promise<TeamMember>{ //why &

        const existing= await this.teamRepo.findOne({where:{slug:memberdata.slug}} )

        if(existing){
            throw new ConflictException('A team member with this slug already exists')
        }
        const teamMember= this.teamRepo.create(memberdata)

        return await this.teamRepo.save(teamMember);
    }

 // Admin: get single team member by id
  async findOneById(id: string): Promise<TeamMember> {
    const teamMember = await this.teamRepo.findOne({
      where: { id },
    });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    return teamMember;
  }

  // Update team member
  async update(
    id: string,
    updateTeamMemberDto?: UpdateTeamMemberDto,
    imageUrl?: string, // image optional
  ): Promise<TeamMember> {

    const teamMember = await this.findOneById(id);

    // if updated data available then if slug changed , duplicate check
    if(updateTeamMemberDto){ 
    if ( (updateTeamMemberDto.slug) && (updateTeamMemberDto.slug !== teamMember.slug) ) {
      const existingMember = await this.teamRepo.findOne({
        where: { slug: updateTeamMemberDto.slug },
      });
      if(existingMember){
        throw new ConflictException('A team member with this slug already exists');
       }     
    }
  }

    //dto merge
    Object.assign(teamMember, updateTeamMemberDto)

    if(imageUrl){
        teamMember.imageUrl= imageUrl;
    } 

    return await this.teamRepo.save(teamMember);
  }
// Delete team member
  async remove(id: string): Promise<{ message: string }> {
    const teamMember = await this.findOneById(id);

    await this.teamRepo.remove(teamMember);

    return {
      message: 'Team member deleted successfully',
    };
  }

    
}