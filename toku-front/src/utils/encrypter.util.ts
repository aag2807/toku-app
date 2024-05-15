import * as CryptoJS from 'crypto-js';

export class Encrypter {
  private static secretKey: string = "kamen-rider";

  public static encrypt( data: string ): string
  {
    const dataToReplace = data.toString();
    const encrypted = CryptoJS.AES.encrypt( dataToReplace, this.secretKey ).toString();

    return encrypted.replace( /\+/g, "-" ).replace( /\//g, "_" ).replace( /=+$/, "" );
  }

  public static decrypt( ciphertext: string ): string
  {
    const modified = ciphertext.replace( /-/g, "+" ).replace( /_/g, "/" );
    const bytes = CryptoJS.AES.decrypt( modified, this.secretKey );

    return bytes.toString( CryptoJS.enc.Utf8 );
  }
}

