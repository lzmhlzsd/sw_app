$( document ).on( "pageInit", "#page-stores-screen", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-stores-screen',
        data: function () {
            return {
                start_date: moment().format( 'YYYY-MM-DD' ),
                end_date: moment().format( 'YYYY-MM-DD' ),
                selectDatetimeFlag: 'today',
                selectPaymentTypeFlag: ['all'],
                selectStoreFlag: ['all'],
                stores: [],
                datetime: [
                    { id: 'today', name: '今天' },
                    { id: 'yesterday', name: '昨日' },
                    { id: 'month', name: '本月' },
                    { id: 'lastmonth', name: '上月' }
                ],
                payment_type: [
                    { id: 'all', name: '全部' },
                    { id: 'zhifubao', name: '支付宝' },
                    { id: 'weixin', name: '微信' },
                    { id: 'jingdong', name: '京东' },
                    { id: 'yizhifu', name: '翼支付' },
                    { id: 'other', name: '其他' }
                ]
            }
        },
        created() {
            //this.action = store.getQueryString( 'action' );
            var self = this;
            store.post( '/shop/get_screen_shop_list', {}, function ( data ) {
                self.stores = _.union( [{ id: 'all', shop_name: '全部' }], data );
                console.log( self.stores )
            } );

            store.bus.$on( 'stores.screen.selectDate', function ( data ) {
                self.start_date = data.start_date;
                self.end_date = data.end_date;
                selectDatetimeFlag = '';
            } )
        },
        mounted() {

        },
        methods: {
            selectDateTime( item ) {
                this.selectDatetimeFlag = item.id;
                if ( item.id == 'today' ) {
                    this.start_date = moment().format( 'YYYY-MM-DD' );
                    this.end_date = moment().format( 'YYYY-MM-DD' );
                } else if ( item.id == 'yesterday' ) {
                    this.start_date = moment().subtract( 1, 'days' ).format('YYYY-MM-DD' );
                    this.end_date = moment().subtract( 1, 'days' ).format('YYYY-MM-DD' );
                } else if ( item.id == 'month' ) {
                    this.start_date = moment().startOf( 'month' ).format('YYYY-MM-DD' );
                    this.end_date = moment().endOf( 'month' ).format( "YYYY-MM-DD" );
                } else if ( item.id == 'lastmonth' ) {
                    this.start_date = moment().subtract( 1, 'months' ).startOf('month' ).format( 'YYYY-MM-DD' );
                    this.end_date = moment().subtract( 1, 'months' ).endOf( 'month' ).format( "YYYY-MM-DD" );
                }
            },
            selectPayMentType( item ) {
                if ( item.id == 'all' ) {
                    this.selectPaymentTypeFlag = ['all'];
                }
                else {
                    this.removeItemInArray( this.selectPaymentTypeFlag, 'all' );
                    if ( _.indexOf( this.selectPaymentTypeFlag, item.id ) > -1 ) {
                        this.removeItemInArray( this.selectPaymentTypeFlag, item.id );
                    }
                    else {
                        this.selectPaymentTypeFlag.push(item.id);
                    }
                }
            },
            selectStore( item ) {
                if ( item.id == 'all' ) {
                    this.selectStoreFlag = ['all'];
                }
                else {
                    this.removeItemInArray( this.selectStoreFlag, 'all' );
                    if ( _.indexOf( this.selectStoreFlag, item.id ) > -1 ) {
                        this.removeItemInArray( this.selectStoreFlag, item.id );
                    }
                    else {
                        this.selectStoreFlag.push(item.id);
                    }
                }
            },
            reset() {
                this.selectDatetimeFlag = 'today';
                this.selectPaymentTypeFlag = ['all'];
                this.selectStoreFlag = ['all'];
            },
            search() {
                store.bus.$emit( 'stores.balance.selectDate', {
                    start_date: this.start_date,
                    end_date: this.end_date,
                    selectPaymentTypeFlag: this.selectPaymentTypeFlag,
                    selectStoreFlag: this.selectStoreFlag
                } )
                $.router.back("./balance.html"); 
            },
            formateSelect( id, flags ) {
                if ( _.indexOf( flags, id ) > -1 ) {
                    return true;
                }
            },
            removeItemInArray( array, item ) {
                var index = -1;
                for ( var i = 0; i < array.length; i++ ) {
                    if ( array[ i ] == item ) {
                        index = i;
                        break;
                    }
                }
                if ( index != -1 ) {
                    array.splice( index, 1 );
                }
                return array;
            }
        }
    } )
} );