import { pathExists } from 'fs-extra';

export class RegexHelper{

   removeIllegalPathCharacters(path:string):string{
        return path.replace(/[/\\?%*:|"<>]/g, '');

   }
   normalizePath(path:string){
     return path.replace(String.fromCharCode(92),"/");
   }


}
