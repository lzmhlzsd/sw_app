$( document ).on( "pageInit", "#page-goodscode-receive", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-goodscode-receive',
        data: function () {
            return {
                shop_name: '',
                no: '',
            }
        },
        created() {
            var self = this;
            var clerk_id = store.getQueryString( 'clerkid' );
            if ( clerk_id ) {
                store.post( '/account/qr_pay_url', { clerk_id: clerk_id }, function ( data ) {
                    self.shop_name = data.shop_name;
                    self.no = data.no;
                    var qrcode = new QRCode('code', {
                        text: data.url,
                        width: 150,
                        height: 150,
                        colorDark : '#000000',
                        colorLight : '#ffffff',
                        correctLevel : QRCode.CorrectLevel.H
                      });
                } )
            }
            else {
                store.post( '/account/qr_pay_url', {}, function ( data ) {
                    self.shop_name = data.shop_name;
                    self.no = data.no;
                    var qrcode = new QRCode('code', {
                        text: data.url,
                        width: 150,
                        height: 150,
                        colorDark : '#000000',
                        colorLight : '#ffffff',
                        correctLevel : QRCode.CorrectLevel.H
                      });
                } )
            }

        },
        mounted() {

        },
        methods: {
            _toUtf8( str ) {
                var out, i, len, c;
                out = "";
                len = str.length;
                for ( i = 0; i < len; i++ ) {
                    c = str.charCodeAt( i );
                    if ( ( c >= 0x0001 ) && ( c <= 0x007F ) ) {
                        out += str.charAt( i );
                    } else if ( c > 0x07FF ) {
                        out += String.fromCharCode( 0xE0 | ( ( c >> 12 ) & 0x0F ) );
                        out += String.fromCharCode( 0x80 | ( ( c >> 6 ) & 0x3F ) );
                        out += String.fromCharCode( 0x80 | ( ( c >> 0 ) & 0x3F ) );
                    } else {
                        out += String.fromCharCode( 0xC0 | ( ( c >> 6 ) & 0x1F ) );
                        out += String.fromCharCode( 0x80 | ( ( c >> 0 ) & 0x3F ) );
                    }
                }
                return out;
            }
        }
    } )
} );