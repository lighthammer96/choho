@extends('layouts.layout')


@section('content')

 

 

<div class="row">
    <div class="col-md-12">
        <center>
            <label for="">Asesor</label><br>
            <select name="codigo_asesor" id="codigo_asesor"></select>
        </center>
    </div>
    <br><br> <br>
    <div class="col-md-12">
        <pre id="response"></pre>
    </div>
</div>


@endsection

