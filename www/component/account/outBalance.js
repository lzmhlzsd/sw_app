$( document ).on( "pageInit", "#page-account-outbalance", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-account-outbalance',
        data: function () {
            return {
                ruleForm: {
                    start_date: '',
                    end_date: '',
                    email: ''
                },
                rules: {
                    start_date: [
                        { required: true, message: '开始日期不能为空' },
                        { datelte: 'end_date', message: '开始日期不能大于结束日期' }
                    ],
                    end_date: [
                        { required: true, message: '结束日期不能为空' }
                    ],
                    email: [
                        { email: true, message: '请输入正确的邮箱地址' }
                    ]
                }
            }
        },
        created() {

        },
        mounted() {
            $( '.startdate' ).calendar();
            $( '.enddate' ).calendar();
        },
        methods: {
            output( formName ) {
                var self = this;
                self.ruleForm.start_date = $( '.startdate' ).val();
                self.ruleForm.end_date = $( '.enddate' ).val();
                this.$refs[formName].validate( function ( valid ) {
                    if ( valid ) {
                        console.log( 'validate success' )
                        store.post( '/balance/export_balance', self.ruleForm, function ( data ) {
                            console.log( data )
                        } )
                    }
                    else {
                        console.log( 'validate fail' )
                    }
                } )
            }
        }
    } )
} );