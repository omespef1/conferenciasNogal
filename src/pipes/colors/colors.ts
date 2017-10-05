import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ColorsPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'colors',
})
export class ColorsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if(value.indexOf("twitter")>0)
        return "twitter"
        if(value.indexOf("facebook")>0)
            return "facebook"
            if(value.indexOf("vimeo")>0)
                return "vimeo"
    return "google";
  }
}
