import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from "@capacitor/core";

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  @ViewChild('filePicker', {static: false}) filePicker: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false;
  selectedImage: string;
  usePicker = false;

  constructor() { }

  ngOnInit() {
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePicker.nativeElement.click();
      return;
    }

    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        this.selectedImage = image.base64String;
        this.imagePick.emit(image.base64String);
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
    };
    fr.readAsDataURL(pickedFile);
  }

}
