import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormErrorComponent } from "../shared/form-error/form-error.component";
import { NoteService } from "../shared/note.service";
import { NoteEditModel } from "./note-edit.model";

@Component({
	selector: "app-note-edit",
	standalone: true,
	templateUrl: "./note-edit.component.html",
	imports: [ReactiveFormsModule, CommonModule, FormErrorComponent],
})
export class NoteEditComponent {
	id!: string;
	note!: NoteEditModel;
	formGroup!: FormGroup;

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private noteService: NoteService
	) {}

	ngOnInit() {
		this.init();
	}

	init() {
		const idParam = this.activeRoute.snapshot.paramMap.get("id");
		if (idParam) {
			this.id = idParam;
			if (this.id !== "0") {
				const dto = this.noteService.get(this.id);
				this.note = new NoteEditModel(dto);
			} else {
				this.note = new NoteEditModel();
			}

			this.formGroup = new FormGroup({
				title: new FormControl(this.note.title, [Validators.required]),
				description: new FormControl(this.note.description),
			});
		} else {
			console.error("No ID-Param found");
		}
	}

	addNote() {
		const { title, description } = this.formGroup.value;
		if (this.formGroup.valid) {
			this.note.title = title as string;
			this.note.description = description as string;
			this.noteService.save(this.note);
			this.formGroup.reset();
			this.router.navigateByUrl("/");
		}
	}

	cancelNote() {
		this.router.navigateByUrl("/");
	}
}
