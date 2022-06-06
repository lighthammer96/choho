
<!DOCTYPE html>
<html>

<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Choho</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="{{ URL::asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
    
    <!-- <link rel="stylesheet" href="{{ URL::asset('bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css') }}"> -->
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ URL::asset('bower_components/font-awesome/css/font-awesome.min.css') }}">
    <!-- Ionicons -->
    <link rel="stylesheet" href="{{ URL::asset('bower_components/Ionicons/css/ionicons.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ URL::asset('dist/css/AdminLTE.min.css') }}">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="{{ URL::asset('dist/css/skins/_all-skins.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('dist/css/jquery.dataTables.min.css') }}">
   
    <link rel="stylesheet" href="{{ URL::asset('sweetalert/dist/sweetalert.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('notifications/notification.css') }}">


    <link rel="stylesheet" href="{{ URL::asset('selectize/selectize.bootstrap2.css') }}">

    <link rel="stylesheet" href="{{ URL::asset('plugins/iCheck/all.css') }}">


    <!-- daterange picker -->
    <link rel="stylesheet" href="{{ URL::asset('bower_components/bootstrap-daterangepicker/daterangepicker.css') }}">
    <!-- bootstrap datepicker -->
    <link rel="stylesheet" href="{{ URL::asset('bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css') }}">
 
    <!-- Bootstrap time Picker -->
    <link rel="stylesheet" href="{{ URL::asset('plugins/timepicker/bootstrap-timepicker.min.css') }}">

    <link rel="stylesheet" href="{{ URL::asset('bower_components/modal-effect/css/component.css') }}">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

    <!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">


</head>

<body class="hold-transition skin-blue sidebar-mini">
    <!-- Site wrapper -->
    <div class="wrapper">

  
        @include('layouts.header')

     

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
           

            <!-- Main content -->
            <section class="content">
                
                <!-- Default box -->
                <div class="box">
                  
                    <div class="box-body">
                        
                      
                        
                        @yield('content')
                    </div>
                    
                    <!-- <div class="box-footer">
                        Footer
                    </div> -->
              
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->
        </div>
      
        @include('layouts.footer')


       
    
        <div class="control-sidebar-bg"></div>


        <div class="md-modal md-effect-13" id="ModalProgreso">
            <div class="md-content">
                <h3 id="TituloProgreso" style="padding-bottom: 0 !important; font-weight: bold;">Procesando ...</h3>
                <div style="width: 500px;" id="ContenidoProgreso">
                    <div id="CargandoProceso">
                        <center>
                            <img src="{{ URL::asset('images/loading.gif') }}">
                        </center>
                    </div>
                    <div class="progress progress-md" id="BarraProgreso" style="display: none;">
                        <div class="progress-bar progress-bar-primary progress-bar-striped progress-animated wow animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                            <!-- <span class="sr-only">48% Complete</span> -->
                            <span id="PorcentajeProgreso">0%</span>
                        </div>
                        <br>
                    </div>

                    <div id="MensajeProgreso" style="display: none;">
                        <h3  style="padding-bottom: 0 !important;"><strong></strong></h3>
                        <br>
                    </div>

                    <center>

                        <strong id="TiempoTranscurrido" style="display: none;">

                        </strong>
                        <br>
                        <button type="button" style="display: none; margin-top: 15px;" class="ok btn-sm btn-primary waves-effect waves-light"><i class="md md-check"></i>&nbsp;[OK]</button>
                    </center>
                </div>
            </div>
        </div>
        <div class="md-overlay"></div>

    </div>

    <script>
        var BaseUrl = "<?php echo URL::to('/'); ?>";
        var _token = "<?php echo csrf_token() ?>";
 
    </script>
    <!-- jQuery 3 -->
    <script src="{{ URL::asset('bower_components/jquery/dist/jquery.min.js') }}"></script>
    <!-- Bootstrap 3.3.7 -->
    <script src="{{ URL::asset('bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    <!-- SlimScroll -->
    <script src="{{ URL::asset('bower_components/jquery-slimscroll/jquery.slimscroll.min.js') }}"></script>
    <!-- FastClick -->
    <script src="{{ URL::asset('bower_components/fastclick/lib/fastclick.js') }}"></script>
    <!-- AdminLTE App -->
    <script src="{{ URL::asset('dist/js/adminlte.min.js') }}"></script>
    <!-- AdminLTE for demo purposes -->
    
    <script src="{{ URL::asset('dist/js/demo.js') }}"></script>
     <script src="{{ URL::asset('dist/js/jquery.dataTables.min.js') }}"></script>
    <!-- <script src="{{ URL::asset('bower_components/datatables.net/js/jquery.dataTables.min.js') }}"></script> -->
    <script src="{{ URL::asset('bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>

    <script src="{{ URL::asset('sweetalert/dist/sweetalert.min.js') }}"></script>
    
    <script src="{{ URL::asset('notifyjs/dist/notify.min.js') }}"></script>
    <script src="{{ URL::asset('notifications/notify-metro.js') }}"></script>
    <script src="{{ URL::asset('notifications/notifications.js') }}"></script>
    
    
    <script src="{{ URL::asset('selectize/selectize.js') }}"></script>
    

    <script src="{{ URL::asset('plugins/iCheck/icheck.min.js') }}"></script>

    <!-- InputMask -->
    <script src="{{ URL::asset('plugins/input-mask/jquery.inputmask.js') }}"></script>
    <script src="{{ URL::asset('plugins/input-mask/jquery.inputmask.date.extensions.js') }}"></script>
    <script src="{{ URL::asset('plugins/input-mask/jquery.inputmask.extensions.js') }}"></script>
    <!-- date-range-picker -->
    <script src="{{ URL::asset('bower_components/moment/min/moment.min.js') }}"></script>
    <script src="{{ URL::asset('bower_components/bootstrap-daterangepicker/daterangepicker.js') }}"></script>
    <!-- bootstrap datepicker -->
    <script src="{{ URL::asset('bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js') }}"></script>
    <script src="{{ URL::asset('bower_components/modal-effect/js/classie.js') }}"></script>
    <script src="{{ URL::asset('bower_components/modal-effect/js/modalEffects.js') }}"></script>

    <script src="{{ URL::asset('dist/js/highcharts.js') }}"></script>
    <script src="{{ URL::asset('app/js/layout.js') }}"></script>
    <!-- libreria para los sockets -->
    <script src="{{ URL::asset('dist/js/socket.io-2.3.0.js') }}"></script>
 
    <script src="{{ URL::asset('app/js/BASE_JS.js?version=06062022') }}"></script>
    <script src="{{ URL::asset('app/js/app.js?version=06062022') }}"></script>

</body>


</html>