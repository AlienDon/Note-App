import { Injectable } from '@angular/core';
import { NoteDto } from '../shared/note.dto';

@Injectable()
export class NoteDetailModel extends NoteDto {
	constructor(dto: NoteDto) {
		super();
		Object.assign(this, dto);
	}
}
