import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Controller()
export class ContactsController{
    constructor(private readonly contactsService: ContactsService){}

    // =========================
  // Public Routes
  // =========================
    @Post('contact')
    async create(@Body()messageData: CreateContactMessageDto){
        const createmessage= await this.contactsService.create(messageData);

        return {
            success:true,
            message:'Contact message sent successfully',
            data: createmessage,
        }
    }

  // =========================
  // Admin Routes
  // =========================

  @Get('admin/contact-messages')
  async findAll() {
    const contactMessages = await this.contactsService.findAll();

    return {
      success: true,
      message: 'Contact messages fetched successfully',
      data: contactMessages,
    };
  }

  @Get('admin/contact-messages/:id')
  async findOneById(@Param('id') id: string) {
    const contactMessage = await this.contactsService.findOneById(id);

    return {
      success: true,
      message: 'Contact message fetched successfully',
      data: contactMessage,
    };
  }

  @Delete('admin/contact-messages/:id')
  async remove(@Param('id') id: string) {
    const result = await this.contactsService.remove(id);

    return {
      success: true,
      message: result.message,
      data: null,
    };
  }

    
}