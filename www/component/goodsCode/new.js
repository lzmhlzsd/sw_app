$( document ).on( "pageInit", "#page-goodscode-new", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-goodscode-new',
        data: function () {
            return {
                pictureSource: '',
                destinationType: '',
                photo: [{
                    src: './../../img/logo.png'
                },{
                    src: './../../img/logo.png'
                },{
                    src: './../../img/logo.png'
                },{
                    src: './../../img/logo.png'
                },{
                    src: './../../img/logo.png'
                }]
            }
        },
        created() {
            this.pictureSource = navigator.camera.PictureSourceType;
            this.destinationType = navigator.camera.DestinationType;
        },
        methods: {
            deleteImg(index) {
                console.log( index )
                this.photo.splice(index, 1);
            },
            upload(event) {
                var self = this;
                var buttons1 = [
                    {
                        text: '拍照',
                        onClick: function () {
                            //拍照并获取Base64编码的图像（quality : 存储图像的质量，范围是[0,100]）
                            navigator.camera.getPicture( self.onPhotoDataSuccess, self.onFail, {
                                quality: 50,
                                destinationType: self.destinationType.FILE_URI
                            } );
                        }
                    },
                    {
                        text: '相册',
                        onClick: function () {
                            navigator.camera.getPicture( self.onPhotoURISuccess, self.onPhotoURLFail, {
                                quality: 50,
                                destinationType: self.destinationType.FILE_URI,
                                sourceType: self.pictureSource.PHOTOLIBRARY
                            } );
                        }
                    }
                ];
                var buttons2 = [
                    {
                        text: '取消',
                        bg: 'primary'
                    }
                ];
                var groups = [buttons1, buttons2];
                $.actions( groups );
            },
            //获取相册照片成功
            onPhotoURISuccess( imageURI ) {
                //打印出照片路径
                console.log( imageURI );
                //显示照片
                this.photo.push( {
                    src: imageURI
                } )
                //this.uploadServer( imageURI );
            },
            //获取相册照片失败
            onPhotoURLFail( message ) {
                //$.toast( '照片获取失败: ' + message );
            },
            //拍照成功
            onPhotoDataSuccess( imageURI ) {
                this.photo.push( {
                    src: imageURI
                } )
                //开始上传
                //this.uploadServer( imageURL );
            },
            //拍照失败
            onFail( message ) {
                //$.toast( '拍照失败: ' + message );
            },
            uploadServer( fileURL ) {
                //上传成功
                var success = function ( r ) {
                    console.log( "上传成功! Code = " + r.responseCode );
                }

                //上传失败
                var fail = function ( error ) {
                    alert( "上传失败! Code = " + error.code );
                }

                var options = new FileUploadOptions();
                options.fileKey = "file1";
                options.fileName = fileURL.substr( fileURL.lastIndexOf( '/' ) + 1 );
                //options.mimeType = "text/plain";

                //上传参数
                var params = {};
                params.value1 = "test";
                params.value2 = "param";
                options.params = params;

                var ft = new FileTransfer();
                //上传地址
                var SERVER = "http://www.hangge.com/upload.php"
                ft.upload( fileURL, encodeURI( SERVER ), success, fail, options );
            },
            //生成二维码
            createRCode() {
                $.router.loadPage( './goodsRCode.html' );
            }
        }
    } )
} );