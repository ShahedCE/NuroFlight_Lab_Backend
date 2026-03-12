import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { imageFileFilter, multerStorage } from "../uploads/multer.config";
import { CreateTeamMemberDto } from "./dto/create-team-member.dto";
import { TeamService } from "./team.service";

@Controller()
export class TeamController{

    constructor(private readonly teamService:TeamService){}

    //Admin Route
    @Post('admin/team')
@UseInterceptors(
  FileInterceptor('image', {
    storage: multerStorage('team'), // uploads/team
    fileFilter: imageFileFilter,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB limit
    },
  }),
)
async create(
  @UploadedFile() file: Express.Multer.File,
  @Body() memberData: CreateTeamMemberDto,
) {

  // uploaded file path
  const imagePath = `/uploads/team/${file.filename}`;

  const teamMember = await this.teamService.create({ ...memberData, imageUrl: imagePath });

  return {
    success: true,
    message: 'Team member created successfully',
    data: teamMember,
  };
}
    
}