import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Note} from './note.entity';

@Injectable()
export class NotesService {
  constructor(
      @InjectRepository(Note) private notesRepository: Repository<Note>,
  ) {
  }

  async getNotes(): Promise<Note[]> {
    return await this.notesRepository.find();
  }

  findOne(id: string): Promise<Note> {
    return this.notesRepository.findOne(id, {relations: ['subscriptions']});
  }

  async createNote(note: Note) {
    return await this.notesRepository.save(note);
  }

  async remove(id: string) {
    return await this.notesRepository.delete(id);
  }

  async editNote(id: number, note: Note): Promise<Note> {
    const editedNote = await this.notesRepository.findOne(id);

    if (!editedNote) {
      throw new NotFoundException('Note is not found');
    }

    editedNote.description = note.description;
    editedNote.title = note.title;

    return await editedNote.save();
  }
}
