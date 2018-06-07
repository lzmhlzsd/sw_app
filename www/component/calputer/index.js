$( document ).on( "pageInit", "#page-calputel-index", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-calputel-index',
        data: function () {
            return {
                display: '',
                result: '0.00',
                height: 0,
                times: 1  //轮询订单次数; 默认3s一次， 30s后失败；
            }
        },
        created() {
            var c_page = $( '#page-calputel-index' );
            $( '.calculator .keys td' ).height( $( window ).width() / 4 * 0.65 )
            $( '.display' ).height( ( $( window ).height() - $( '.calculator' ).height() - $( '#area2' ).height() ) *
                0.5 )
            console.log( $( c_page ).find( '.calculator table' ).height() )
            //$( c_page ).find( '.payment-type' ).height( $( c_page ).find( '.calculator table' ).height() );
            this.height = $( c_page ).find( '.calculator table' ).height();
            $( c_page ).find( '.payment-type' ).css( {
                height: this.height + 'px',
                bottom: '-' + this.height + 'px'
            } )
            $( c_page ).find( '.payment-img' ).height( $( c_page ).find( '.payment-img' ).width() )
            console.log('androiddebug_web3: ' + new Date().getTime())
        },
        mounted() {

        },
        methods: {
            key( n ) {
                if ( n == 'x' || n == '-' || n == '+' ) {
                    if ( !this.validateLastChar( this.display ) || this.display == "" ) {
                        return;
                    }
                }
                if ( n == "00" ) {
                    if ( !this.validateLastChar( this.display ) || this.display == "" ) {
                        return;
                    }
                }
                this.display += n;
                this.total();
            },
            point( n ) {
                var suffix;
                if ( /([^\+\-\x\/\(\:]+)$/.test( this.display ) ) {
                    suffix = RegExp.$1;
                }
                if ( suffix.indexOf( '.' ) < 0 ) {
                    this.display += n;
                }
            },
            clear() {
                this.display = "";
                this.result = '0.00';
            },
            back() {
                this.display = this.display.substring( 0, this.display.length - 1 )
                if ( this.display == "" ) {
                    this.result = '0.00';
                }
                else {
                    this.total();
                }
            },
            total() {
                if ( this.validateLastChar( this.display ) ) {
                    this.result = eval( this.display.replace( /x/g, '*' ) ).toFixed( 2 );
                }
            },
            //验证最后一个字符是否已经是运算符
            validateLastChar( str ) {
                var lastChar = str.substr( str.length - 1, 1 );
                if ( lastChar == '+' || lastChar == '-' || lastChar == 'x' || lastChar == '/' || lastChar == '.' ) {
                    return false;
                } else {
                    return true;
                }
            },
            //收款
            receivable() {
                if ( parseFloat( this.result ) > 5000 ) {
                    $.toast( '收款金额不能大于5000' );
                } else if ( parseFloat( this.result ) == 0 ) {
                    $.toast( '收款金额必须大于0' );
                } else {
                    $( '.back-model' ).show();
                    $( '#page-calputel-index' ).find( '.payment-type' ).animate( {
                        bottom: '0px'
                    }, 200 )
                }
            },
            payment( type, e ) {
                // cordova.plugins.SmScanner.print( ['abc'], function ( msg ) {
                //     console.log( msg );
                //     alert( msg );
                // }, function ( msg ) {
                //     console.log( msg );
                //     alert( msg );
                // } );
                var self = this;
                if ( type == "weixin" || type == "zhifubao" ) {
                    cordova.plugins.SmScanner.scan( [], function ( msg ) {
                        console.log( msg );
                        $.showPreloader( '收款中...' )
                        store.post( '/pay/scan_code_pay', { auth_code: msg, amount: self.result }, function ( data ) {
                            if ( data.charge_id ) {   //订单创建成功
                                self.checkChange( data )
                            }
                            else {
                                $.hidePreloader();
                                $.toast( '订单创建失败' )
                            }
                        } )

                        //alert( msg );

                    }, function ( msg ) {
                        console.log( msg );
                        $.toast( '扫码失败' );
                    } );
                }
                if ( type == "pos" ) {
                    cordova.plugins.SmScanner.pos( [{
                        amount: self.result
                    }], function ( msg ) {
                        //console.log( msg );
                        // bizOrderNumber: "P1011771011541506330180569"   订单流水号
                        // completedTime: "2017-09-25 17:04:05"           支付时间
                        // srcAmt: "0.01"                                 收款金额
                        // unionMerchantId: "1000025"                     商户Id
                        // unionStoreId: "1000020"                        门店Id
                        // walletType: "3"                                支付类型
                        //调用订单接口
                        store.post( '/order/create_pay_card_order', {
                            "order_no": msg.bizOrderNumber, //流水号
                            "pay_time": msg.completedTime, //支付时间
                            "amount": msg.srcAmt, //收款金额
                            "merchant_id": msg.unionMerchantId, //商户Id
                            "store_id": msg.unionStoreId, //门店Id
                            "wallet_type": msg.walletType, //支付类型
                        }, function ( data ) {
                            //$.toast( '订单创建失败' )
                        } )
                        $( '.back-model' ).trigger( 'click' );
                        self.clear();
                        $.toast( '收款成功' );
                    }, function ( msg ) {
                        $.toast( '调用银联失败' );
                    } )
                }
            },
            closePaymentType( e ) {
                if ( e.target.className == 'back-model' ) {
                    $( '.back-model' ).hide();
                    $( '#page-calputel-index' ).find( '.payment-type' ).animate( {
                        bottom: '-' + this.height + 'px'
                    }, 200 )
                }
            },
            checkChange( v ) {
                var self = this;
                var ds = v;
                store.post( '/pay/check_charge', { charge_id: ds.charge_id }, function ( data ) {
                    if ( data.paid ) {   //支付成功
                        var channel;
                        if ( data.pay_channel == 'wxbarcodepay_pinganpay' ) {
                            channel = '微信支付';
                        }
                        else if ( data.pay_channel == 'alibarcodepay_pinganpay' ) {
                            channel = '支付宝支付';
                        }
                        self.times = 1;
                        cordova.plugins.SmScanner.print( [{
                            print: '001',
                            title: ds.subject,
                            amount: ds.amount,
                            order: ds.orderno,
                            date_time: data.time_paid,
                            payment: channel,
                            merchant: ds.alias,
                            clerk: ds.clerk_name,
                            phone: ds.hotline,
                            transaction_no: data.transaction_no
                        }], function ( msg ) {
                            console.log( msg );
                        }, function ( msg ) {
                            console.log( msg );
                            $.toast( msg );
                        } );
                        $.hidePreloader();
                        $( '.back-model' ).trigger( 'click' );
                        self.clear();
                        $.toast( '收款成功' )
                    }
                    else {
                        setTimeout( function () {
                            self.times++;
                            if ( self.times < 15 ) {
                                self.checkChange( ds );
                            }
                            else {
                                self.times = 1;
                                $.hidePreloader();
                                $.toast( '收款超时失败' )
                            }
                        }, 2000 );
                    }
                } );
            }
        }
    } )
} );