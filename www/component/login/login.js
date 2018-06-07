$( document ).on( "pageInit", "#page-login-login", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-login-login',
        data: function () {
            return {
                type: 0,   //登录方式： 0=商家;1=店员；
                vcode: null,
                vcode_disabled: false,
                vcode_text: '',
                ruleForm: {
                    phone: '',
                    code: ''
                },
                rules: {
                    phone: [
                        { required: true, message: '手机号不能为空' },
                        { phone: true, message: '请输入正确的手机号码' }
                    ],
                    code: [
                        { required: true, message: '验证码不能为空' }
                    ]
                }
            }
        },
        created() {
            this.vcode = new store.validateCode( 60, '验证码' );
            this.vcode_disabled = this.vcode.disabled;
            this.vcode_text = this.vcode.text;
        },
        methods: {
            getCode( formName ) {
                var self = this;
                this.$refs[formName].validateFiled( ['phone'], function ( valid ) {
                    if ( valid ) {
                        self.vcode.getCode( function ( data ) {
                            self.vcode_disabled = data.disabled;
                            self.vcode_text = data.text;
                        } )
                        // store.post( '/passport/send_message', { phone: self.ruleForm.phone }, function ( data ) {
                        //     $.toast( '验证码已发送' );
                        // } )

                        $.post( store.httpUrl + '/passport/send_message?v=' + store.randomString( 8 ), { phone: self.ruleForm.phone }, function ( res ) {
                            if ( res.ecode == 0 ) {
                                $.toast( '验证码已发送' );
                            }
                            else {
                                $.toast( res.emsg )
                            }
                        })
                    } else {
                        console.log( 'form validate fail' )
                    }
                } )
            },
            login( formName ) {
                var self = this;
                this.$refs[formName].validate( function ( valid ) {
                    if ( valid ) {
                        $.showPreloader('登录中...')
                        $.post( store.httpUrl + '/passport/login?v=' + store.randomString( 8 ), { 
                            phone: self.ruleForm.phone,
                            verify_code: self.ruleForm.code,
                            type: self.type
                        }, function ( res ) {
                            $.hidePreloader();
                            if ( res.ecode == 0 ) {
                                window.localStorage.setItem( 'token', res.result.token );
                                window.localStorage.setItem( 'mafu_user_type', res.result.mafu_user_type );
                                window.localStorage.setItem( 'user_id', res.result.user_id );
                                window.localStorage.setItem( 'clerk_id', res.result.clerk_id );
                                window.localStorage.setItem( 'alias', res.result.alias );
                                window.localStorage.setItem( 'status', res.result.status );
                                window.localStorage.setItem( 'phone', res.result.phone );
                                self.vcode.stop();
                                $.router.loadPage( './../../index.html' );
                            }
                            else {
                                $.toast( res.emsg )
                            }
                        })
                        // store.post( '/passport/login', {
                        //     phone: self.ruleForm.phone,
                        //     verify_code: self.ruleForm.code,
                        //     type: self.type
                        // }, function ( data ) {
                        //     //存储token
                        //     window.localStorage.setItem( 'token', data.token );
                        //     window.localStorage.setItem( 'user_id', data.user_id );
                        // } )
                    }
                    else {
                        console.log( 'form validate fail' )
                    }
                } )
            },
            loginToggle() {
                this.type = 1 - this.type;
            }
        }
    } )
} );