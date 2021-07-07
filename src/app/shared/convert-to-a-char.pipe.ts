import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'convertToAChar'
})
export class ConvertToACharPipe implements PipeTransform {
    transform(value: string, fromCharacter: string, toCharacter: string): string {
        
        return value.replace(new RegExp(fromCharacter, 'g'), toCharacter);
    }
}
