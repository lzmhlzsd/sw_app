$( document ).on( "pageInit", "#page-stores-selectdate", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-stores-selectdate',
        data: function () {
            return {
                ruleForm: {
                    start_date: '',
                    end_date: '',
                },
                rules: {
                    start_date: [
                        { required: true, message: '开始日期不能为空' },
                        { datelte: 'end_date', message: '开始日期不能大于结束日期' }
                    ],
                    end_date: [
                        { required: true, message: '结束日期不能为空' }
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
            search( formName ) {
                var self = this;
                self.ruleForm.start_date = $( '.startdate' ).val();
                self.ruleForm.end_date = $( '.enddate' ).val();
                this.$refs[formName].validate( function ( valid ) {
                    if ( valid ) {
                        console.log( 'validate success' )
                        store.bus.$emit( 'stores.screen.selectDate', {
                            start_date: self.ruleForm.start_date,
                            end_date: self.ruleForm.end_date
                        })
                        $.router.back("./screen.html"); 
                    }
                    else {
                        console.log( 'validate fail' )
                    }
                } )
            }
        }
    } )
} );