$( document ).on( "pageInit", "#page-stores-orderlist", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-stores-orderlist',
        data: function () {
            return {
                title: '',
                orderlist: [],
                select_datetime_start: '',
                select_datetime_end: '',
                select_store: [],
                select_cleark: [],
                journal_type: 1,
                select_payment: [],
                exceptid: '',
                page_size: 20,
                nodata: false,
                loading: false,
                detail_title: ''
            }
        },
        created() {
            this.select_datetime_start = store.getQueryString( 'select_datetime_start' );
            this.select_datetime_end = store.getQueryString( 'select_datetime_end' );
            this.select_store = store.getQueryString( 'select_store' ).split(',');
            this.select_cleark = store.getQueryString( 'select_cleark' );
            this.journal_type = store.getQueryString( 'journal_type' );
            this.select_payment = store.getQueryString( 'select_payment' ).split(',');
            this.exceptid = store.getQueryString( 'exceptid' );
            this.page_size = store.getQueryString( 'page_size' );
            if ( this.journal_type == '1' ) {
                this.title = '收款明细';
                this.detail_title = '收款详情';
            }
            if ( this.journal_type == '10' ) {
                this.title = '服务费明细'
                this.detail_title = '服务费详情';
            }
            this.getOrderDetail();
        },
        mounted() {
            var self = this;
            $.attachInfiniteScroll('.infinite-scroll-stores');
            $(document).on('infinite', '.infinite-scroll-stores', function () {
                console.log('infinite-scroll-stores');
                // 如果正在加载，则退出
                if (self.loading) return;
                // 设置flag
                self.loading = true;
                var last_order = self.orderlist[self.orderlist.length - 1]; //self.orderlist.pop();
                var last_order_no = last_order.id;
                self.getOrderDetail( last_order_no );
            });
        },
        methods: {
            dateformat( timestamp ) {
                return moment(timestamp * 1000).format('MM/DD HH:mm') 
            }, 
            getOrderDetail( exceptid ) {
                var self = this;
                self.nodata = false;
                store.post( '/order/get_shop_order_list', {
                    select_datetime_start: this.select_datetime_start,
                    select_datetime_end: this.select_datetime_end,
                    select_store: this.select_store,
                    select_cleark: this.select_cleark,
                    journal_type: this.journal_type,
                    select_payment: this.select_payment,
                    exceptid: exceptid ? exceptid : this.exceptid,
                    page_size: this.page_size
                }, function ( data ) {
                    if ( data.length == 0 || data.length < self.page_size ) {
                        $.detachInfiniteScroll($('.infinite-scroll-stores'));
                        $('#page-stores-orderlist').find('.infinite-scroll-preloader').remove();
                    }
                    self.orderlist = self.orderlist.concat( data );
                    self.nodata = true;
                    self.loading = false;
                } )
            },
            showdetail( list ) {
                var self = this;
                store.set( 'orderdetail', {
                    title: self.detail_title,
                    data: [
                        { name: '时间', value: moment( list.time * 1000 ).format( 'YYYY-MM-DD HH:mm:ss' ) },
                        { name: '金额', value: list.amount },
                        { name: '类型', value: list.journal_type },
                        { name: '支付方式', value: list.channel },
                        { name: '订单编号', value: list.order_no },
                        { name: '商户单号', value: list.transaction_no },
                        { name: '交易单号', value: list.id }
                    ]
                } );
                $.router.loadPage( './../account/details.html' );
            }
        }
    } )
} );