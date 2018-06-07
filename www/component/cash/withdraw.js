$( document ).on( "pageInit", "#page-cash-withdraw", function ( e, id, page ) {
    console.log( 'withdraw' )
    var vm = new Vue( {
        el: '#page-cash-withdraw',
        data: function () {
            return {
                amount: '',
                withdrawDisabled: false,
                password: '',
                bank: {
                    // name: "建设银行", code: 10002, desc: '2284'
                }
            }
        },
        created() {
            var self = this;
            // $.post( store.httpUrl + "/getAccountBalance" ).then( function ( res ) {
            //     store.handlerHttpCallback( res, function ( data ) {
            //         self.amount1 = data.amount1;
            //         self.amount2 = data.amount2;
            //     } )
            // } );

            store.post( '/account/get_account_card_list', { }, function ( data ) {
                if ( data ) {
                    self.bank = {
                        name: data.bank_name,
                        code: data.card_no,
                        desc: data.card_no
                    }
                }
            } )
            var withdraw = store.getQueryString( 'withdrawal' );
            if ( withdraw ) {
                this.amount = withdraw;
                this.checkAmount();
            }
            store.bus.$on( 'cash.withdraw.selectBank', function ( data ) {
                self.bank = data
            } )
        },
        methods: {
            withdraw: function () {
                console.log( '提现' )                                    
                // cordova.plugins.barcodeScanner.scan(
                //     function ( result ) {
                //         // alert("We got a barcode\n" +
                //         //       "Result: " + result.text + "\n" +
                //         //       "Format: " + result.format + "\n" +
                //         //       "Cancelled: " + result.cancelled);

                //         $( '#getbarcode' ).html( result.text )
                //     },
                //     function ( error ) {
                //         alert( "Scanning failed: " + error );
                //     }, {
                //         "preferFrontCamera": false, // iOS and Android
                //         "showFlipCameraButton": false, // iOS and Android
                //         "prompt": "请扫码", // supported on Android only
                //         "formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                //         "orientation": "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
                //     }
                // );
            },
            keyup( ev ) {
                this.checkAmount();
            },
            checkAmount() {
                var r = new RegExp( /^\+?(\d*\.\d{2})$/ );
                if ( r.test( this.amount ) ) {
                    if ( parseFloat( this.amount ) <= parseFloat( store.get( 'balance' )) ){
                        this.withdrawDisabled = true;
                    }
                    else {
                        $.toast( '提现金额不能大于可提现金额' )
                        this.withdrawDisabled = false;
                    }
                }
                else {
                    this.withdrawDisabled = false;
                }
            }
        }
    } )
} );