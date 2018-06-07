$( document ).on( "pageInit", "#page-system-password", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-system-password',
        data: function () {
            return {
                vcode: null,
                vcode_disabled: false,
                vcode_text: '',
                phone: '',
                ruleForm: {
                    password: '',
                    password1: '',
                    // phone: '',
                    vcode: ''
                },
                rules: {
                    password: [
                        { digital: 6, message: '请输入6位数字密码' },
                        { required: true, message: '支付密码不能为空' }
                    ],
                    password1: [
                        { equal: 'password', message: '请输入相同的支付密码' }
                    ],
                    // phone: [
                    //     { phone: true, message: '请输入正确的手机号' }
                    // ],
                    vcode: [
                        { required: true, message: '请输入验证码' }
                    ]
                }
            }
        },
        created() {
            var self = this;
            self.phone = window.localStorage.getItem( 'phone' );
            self.vcode = new store.validateCode( 60, '获取验证码' );
            self.vcode_disabled = self.vcode.disabled;
            self.vcode_text = self.vcode.text;
        },
        methods: {
            save( formName ) {
                var self = this;
                this.$refs[formName].validate( function ( valid ) {
                    if ( valid ) {
                        self.vcode.stop();
                        store.post( '/account/set_trade_pwd', {
                            trade_pwd: self.ruleForm.password1,
                            phone: self.phone,
                            verify_code: self.ruleForm.vcode
                        }, function ( data ) {
                            $.toast( data );
                        } )
                    }
                    else {
                        console.log( 'form validate fail' )
                    }
                } )
            },
            getCode( formName ) {
                var self = this;
                if ( self.vcode_disabled ) {
                    return;
                }
                self.vcode.getCode( function ( data ) {
                    self.vcode_disabled = data.disabled;
                    self.vcode_text = data.text;
                } )
                $.post( store.httpUrl + '/passport/send_message?v=' + store.randomString( 8 ), { phone: self.phone }, function ( res ) {
                    if ( res.ecode == 0 ) {
                        $.toast( '验证码已发送' );
                    }
                    else {
                        $.toast( res.emsg )
                    }
                } )
            }
        }
    } )
} );