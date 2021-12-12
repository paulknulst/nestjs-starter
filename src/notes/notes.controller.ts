import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {Note} from './note.entity';
import {NotesService} from './notes.service';
import {ApiBearerAuth, ApiCreatedResponse, ApiTags} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {
  }

  @Get()
  findAll() {
    return this.notesService.getNotes();
  }

  @Get(':id')
  findOne(@Param('id') uid) {
    return this.notesService.findOne(uid);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Note,
  })
  create(@Body() note: Note) {
    return this.notesService.createNote(note);
  }

  @Patch(':id')
  async editNote(@Body() note: Note, @Param('id') uid: number): Promise<Note> {
    return await this.notesService.editNote(uid, note);
  }

  @Delete(':id')
  async remove(@Param('id') uid) {
    await this.notesService.remove(uid);
  }
}
