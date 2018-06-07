$( document ).on( "pageInit", "#page-account-list", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-account-list',
        data: function () {
            return {
                title: '',
                orderlist: [],
                loading: false,
                journal_type: '',
                nodata: false,
                page_size: 20,
                exceptid: ''
            }
        },
        created() {
            var self = this;
            self.journal_type = store.getQueryString( 'journal_type' );
            switch ( self.journal_type ) {
                case '1':
                    self.title = '收款明细';
                    break;
                case '10':
                    self.title = '服务费明细';
                    break;
                case '11':
                    self.title = '补贴明细';
                    break;
                case '3':
                    self.title = '提现明细';
                    break;
            }

            //journal_type: income = 收入;service = 服务费;subsidy = 补贴;withdraw = 提现;
            //channel: 支付方式

            // self.nodata = false;
            this.getOrderDetail();
        },
        mounted() {
            var self = this;
            $.attachInfiniteScroll( '.infinite-scroll-account' );
            $( document ).on( 'infinite', '.infinite-scroll-account', function () {
                console.log( 'infinite-scroll-account' );
                // 如果正在加载，则退出
                if ( self.loading ) return;
                // 设置flag
                self.loading = true;
                var last_order = self.orderlist[self.orderlist.length - 1]; //self.orderlist.pop();
                var last_order_autoid = last_order.auto_id;
                self.getOrderDetail( last_order_autoid );
            } );
        },
        methods: {
            getOrderDetail( exceptid ) {
                var self = this;
                self.nodata = false;
                // store.post( '/order/get_shop_order_list', {
                //     select_datetime_start: this.select_datetime_start,
                //     select_datetime_end: this.select_datetime_end,
                //     select_store: this.select_store,
                //     select_cleark: this.select_cleark,
                //     journal_type: this.journal_type,
                //     select_payment: this.select_payment,
                //     exceptid: exceptid ? exceptid : this.exceptid,
                //     page_size: this.page_size
                // }, function ( data ) {
                //     if ( data.length == 0 || data.length < self.page_size ) {
                //         $.detachInfiniteScroll($('.infinite-scroll-stores'));
                //         $('#page-stores-orderlist').find('.infinite-scroll-preloader').remove();
                //     }
                //     self.orderlist = self.orderlist.concat( data );
                //     self.nodata = true;
                //     self.loading = false;
                // } )
                store.post( '/balance/balance_list', {
                    journal_type: store.getQueryString( 'journal_type' ),
                    financial_type: store.getQueryString( 'financial_type' ),
                    start_time: store.getQueryString( 'start_date' ),
                    end_time: store.getQueryString( 'end_date' ),
                    exceptid: exceptid ? exceptid : this.exceptid
                }, function ( data ) {
                    if ( data.length == 0 || data.length < self.page_size ) {
                        $.detachInfiniteScroll( $( '.infinite-scroll-stores' ) );
                        $( '#page-account-list' ).find( '.infinite-scroll-preloader' ).remove();
                    }
                    self.orderlist = self.orderlist.concat( data );
                    self.nodata = true;
                    self.loading = false;
                } )
            },
            showdetail( list ) {
                // store.set( 'balance_details', list );
                // $.router.loadPage( './details.html?journal_type=' + store.getQueryString( 'journal_type' ) );
                var journal, amount, channel, title;
                if ( list.journal_type == "1" ) {
                    journal = '收入';
                    amount = list.income;
                    title = '收款详情';
                }
                else if ( list.journal_type == "10" ) {
                    journal = '服务费';
                    amount = list.outcome;
                    title = '服务费详情';
                }
                else if ( list.journal_type == "11" ) {
                    journal = '补贴';
                    amount = list.income;
                    title = '补贴详情';
                }
                else if ( list.journal_type == "3" ) {
                    journal = '提现';
                    amount = list.outcome;
                    title = '提现详情';
                }
                switch ( list.channel ) {
                    case 'wxbarcodepay_pinganpay':
                        channel = '微信';    
                        break;   
                    case 'alibarcodepay_pinganpay':
                        channel = '支付宝';      
                        break;
                }
                store.set( 'orderdetail', {
                    title: title,
                    data: [
                        { name: '时间', value: moment( list.created * 1000 ).format( 'YYYY-MM-DD HH:mm:ss' ) },
                        { name: '金额', value: amount },
                        { name: '类型', value: journal },
                        { name: '支付方式', value: channel },
                        { name: '订单编号', value: list.charge_id },
                        { name: '商户单号', value: list.transaction_no },
                        { name: '交易单号', value: list.id }
                    ]
                });
                $.router.loadPage( './../account/details.html' );
            },
            amount( list ) {
                if ( this.journal_type == '1' || this.journal_type == '10' ) {
                    return list.income;
                }
                else {
                    return list.outcome;
                }
            },
            dateformat( timestamp ) {
                return moment( timestamp * 1000 ).format( 'MM/DD HH:mm' )
            }
        }
    } )
} );