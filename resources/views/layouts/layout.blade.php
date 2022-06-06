
<?php
    // echo "<pre>";
    $data = session()->all();
    // print_r($data);
    // exit;
    echo '<script>var session = [];</script>';
    foreach ($data as $key => $value) {
        // print_r($key);
        // print_r($value);
        
        if($key != "parametros") {
            if(!is_array($value)) {

                echo '<script> session["'.$key.'"] = "'.$value.'"; </script>';
            } else {
                // echo '<script> var arr = [];';
                // foreach ($value as $kv => $vv) {
                //     echo '<script> arr["'.$kv.'"] = "'.$vv.'";  </script>';
                // }

                // echo '<script> session["'.$key.'"] = arr; </script>';
            }
        }

    }
    //echo '<script> console.log(session); </script>';
?>
<!DOCTYPE html>
<html>

<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>IMS System</title>
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

    @isset($stylesheets)
        @foreach ($stylesheets as $style)
            <link rel="stylesheet" href="{{ $style }}">

        @endforeach
    @endisset

    <style>
        textarea {
            resize: none;
        }
    </style>
</head>

<body class="hold-transition skin-blue sidebar-mini">
    <!-- Site wrapper -->
    <div class="wrapper">

        {{-- @yield('header') --}}
        @include('layouts.header')

        {{-- @yield('menu') --}}
        @include('layouts.menu')

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1>
                    {{ $title }}
                    <small>
                        <?php 
                            if(isset($subtitle)) {
                                echo $subtitle;
                            }

                          
                        ?>
                    </small>
                </h1>
                <!-- <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="#">Examples</a></li>
                    <li class="active">Blank page</li>
                </ol> -->
            </section>

            <!-- Main content -->
            <section class="content">
                
                <!-- Default box -->
                <div class="box">
                    <!-- <div class="box-header with-border">
                        <h3 class="box-title">{{ $title }}</h3>
                      
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                                <i class="fa fa-minus"></i></button>
                            <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                                <i class="fa fa-times"></i></button>
                        </div>
                    </div> -->
                    <div class="box-body">
                        <div class="row" style="margin-bottom: 10px;">
                            <div class="col-md-12" id="acciones">
                                <?php

                                    if(isset($botones) && count($botones) > 0) {
                                        echo '<table><tr>';
                                        for ($i=0; $i < count($botones); $i++) { 
                                            echo '<td>'.$botones[$i].'</td>';
                                        }
                                        
                                        echo '</tr></table>';
                                    }
                                ?>
                            </div>
                        </div>
                        
                        <?php 
                            if(isset($tabla)) {
                                echo $tabla;
                            }
                            
                            
                        ?>

                        
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
        <!-- /.content-wrapper -->
        {{-- @yield('footer') --}}
        @include('layouts.footer')

        {{-- @yield('aside') --}}
        @include('layouts.aside')
       
        <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
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
    <!-- ./wrapper -->
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
 
    <script src="{{ URL::asset('app/js/BASE_JS.js?version=051020210813') }}"></script>
    
                           
   
    @isset($scripts)

        @foreach ($scripts as $script)
            <script src="{{ $script }}"></script>
        @endforeach

    @endisset


    <script>
        $(document).ready(function() {
            $('.sidebar-menu').tree()
        })
    </script>
</body>


</html>