import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { ElectronService } from 'ngx-electron';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  fs: any;
  constructor(public sett: SettingsService, private electron: ElectronService, private zone: NgZone) {
    this.fs = electron.remote.require('fs');

  }

  ngOnInit() {
  }




  selectPath() {
    const dialog = this.electron.remote.dialog;
    const path = dialog.showOpenDialog(this.electron.remote.BrowserWindow.getFocusedWindow(),
      {

        properties: ['openDirectory']
      }
    ).then((val) => {
      this.verifyAndSavePath(val.filePaths.toString());
    });


  }



  verifyAndSavePath(path) {
    const testFile = path.toString().replace(/\\/g, '/') + '/test.tst';
    this.fs.writeFile(testFile, '--->', (err) => {
      if (err) {
        toast('Esta ruta no puede ser utilizada!!', 1000);
        return err;
      }
    });
    if (this.fs.existsSync(testFile)) {
      this.fs.unlink(testFile, (err) => {
        if (err) {
          return;
        }
        this.zone.run(() => {
          this.sett.selectedDownloadPath = path.replace(/\\/g, '/');
        });
        toast('ruta de descarga cambiada!!', 1000);
      });
    }
  }




}
