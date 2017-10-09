import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SocialPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'social',
})
export class SocialPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if(value.indexOf("twitter")>0)
        return "logo-twitter";
        if(value.indexOf("facebook")>0)
            return "logo-facebook"
            if(value.indexOf("vimeo")>0)
                return "logo-vimeo"
                if (value.indexOf("linkedin")>0)
                return "logo-linkedin";
                if (value.indexOf("instagram")>0)
                return "logo-instagram";
    return "md-globe";
  }
}
