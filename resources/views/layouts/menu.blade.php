{{-- @section('menu') --}}

<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <?php if(!empty(session("foto")) && file_exists(public_path('fotos_asociados/'.trim(session("foto"))))) { ?>
                    <img style="height: 45px !important;" src="{{ URL::asset('fotos_asociados/'.session("foto")) }}" class="img-circle" alt="User Image">
                <?php } else { ?>
                    <img style="height: 45px !important;" src="{{ URL::asset('images/usuario.png') }}" class="img-circle" alt="User Image">
                <?php } ?>
               
            </div>
            <div class="pull-left info">
                <p>{{ session("usuario_user") }}</p>
                <a href="#"><i class="fa fa-circle text-success"></i></a>
            </div>
        </div>
        
        <!-- /.search form -->
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
            <?php
               
            ?>

            <!-- <li class="header">MAIN NAVIGATION</li>
            <li class="treeview">
                <a href="#">
         
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>

{{-- @endsection --}}