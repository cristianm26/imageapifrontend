import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './services/data.service';
import { Post } from './models/post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  files: any;
  data: any;
  submitted = false;
  form!: FormGroup;
  post = new Post();

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private dataService: DataService) {
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group({
      image: ['null', Validators.required],
    })
  }

  get f() {
    return this.form.controls;
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append("image", this.files, this.files.name)

    this.dataService.uploadData(formData).subscribe(resp => {
      this.data = resp;
      if (this.data.status = true) {
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        })
      } else {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        })
      }
      this.submitted = false;
      this.form.get('image')?.reset();

    })

  }
}
