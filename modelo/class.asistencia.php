<?php

require_once("../vendor/autoload.php");
require_once("class.conexion.php");
require_once("../recursos/consultas.php");
use Dompdf\Dompdf;

ob_start();

$mod = ($_GET['modulo']) ? $_GET['modulo'] : "";

$db = new Conexion();
$modelo = $db->get_conexion();

//EXTRACCION DE ESTUDIANTES
$stmt = $modelo->prepare("SELECT * FROM estudiante WHERE modulo = ? ORDER BY seccion, apellidos");
$stmt->bindParam(1, $mod, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt->closeCursor();

//EXTRACCION DE SECCIONES
$veces = $modelo->prepare("SELECT * FROM seccion WHERE modulo = ?");
$veces->bindParam(1, $mod, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
$veces->execute();
$reps = $veces->rowCount();
$dataSeccion = $veces->fetchAll(PDO::FETCH_ASSOC);
//$salon = $dataSeccion[0]['salon'];
//DIVISION DE LOS ALUMNOS EN LA CANTIDAD DE SECCIONES DESEADAS
$letra = "A";
if ($reps > 0) {
    $tamano = ceil(count($data) / $reps);
    $partes = array_chunk($data, $tamano);
}

$anoactual = date("Y");

$textoss = preg_replace("/[^A-Za-z]/", "", $mod);
$programa = "";

if ($textoss == "MI") {
    $programa = "Children Module";
} else {
    $programa = "Teens Module";
}

function generarFechas($fechaInicial, $cantidad) {
    $fechas = array();
    $fecha = strtotime($fechaInicial);

    for ($i = 0; $i < $cantidad; $i++) {
        $fechas[] = date("Y-m-d", $fecha);
        $fecha = strtotime("+7 days", $fecha);
    }

    return $fechas;
}

$fechaInicial = ($_GET['fecha'])?$_GET['fecha']:"";
$cantidad = 8;
$fechasGeneradas = generarFechas($fechaInicial, $cantidad);

//CREACION DEL PDF
$html = ob_get_clean();

//HAY SECCIONES Y ESTUDIANTES
if($reps>0 && count($data)>0){
    $html.='
    <html>
    <head>
        <meta charset="utf-8">
        <title>Asistencia ' . $mod . '</title>
        
    </head>
    <style>
            body {
                font-family: Arial, sans-serif;
            }

            h1 {
                text-align: center;
                margin: 20px 0;
            }

            h2 {
                margin: 20px 0;
            }

            .table-container {
                text-align: center;
                page-break-inside: avoid;
                margin: 10px auto;
                padding: 10px;
                border: 1px solid #868486;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th{
                padding: 8px;
                text-align: center;
                border: 1px solid #ccc;
                color:#ffff;
            }   

            td {
                padding: 5px;
                text-align: center;
                border: 1px solid #ccc;
            }

            th {
                background-color: #1a56db;
                font-weight: bold;
            }

            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
        </style>
    <body>
    ';
            $i=0;

    foreach($partes as $part){

        if ($dataSeccion[$i]['docente'] == "") {
            $docente = "Sin asignar";
        } else {
            $docente = $dataSeccion[$i]['docente'];
        }

        if ($dataSeccion[$i]['salon'] == "") {
            $salon = "Sin asignar";
        } else {
            $salon = $dataSeccion[$i]['salon'];
        }

            $html.='
            <div class="table-container">
            <h1>Asistencia de ' . $mod . '</h1>
            
            
            <p style="text-align:right; margin-right:60px;">Seccion "'.$letra.'"</p>
            <p style="text-align:left">Profesor: '.$docente.' F._________________</p>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th style="font-size: 12px">Nombre Completo</th>
                        ';

                        foreach($fechasGeneradas as $fechas){
                            $fechaFormateada = date("d/m/Y", strtotime($fechas));
                            $html.='<th>'.$fechaFormateada.'</th>';
                        }
                        $html.='
                    </tr>
                </thead>
                <tbody>
            ';
                        $j=1;
            foreach ($part as $estu) {
             
    
            $html .= '
                            <tr>
                                <td style="font-size: 12px">'.$j.'</td>
                                <td style="font-size: 12px">' . $estu['nombres'].' '.$estu['apellidos'] . '</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ';
                        $j++;
        }
    
        $letra = avanzarLetra($letra);
    
        $html .= '
                        </tbody>
                    </table>
                    </div>
                ';
                $i++;
            }
    
        $html .= ' </body>
        </html>
    ';
    
        $dompdf = new Dompdf();
    
    
        $dompdf->loadHtml($html);
        $dompdf->setPaper('letter','landscape');
        //$dompdf->set_option('defaultFont','Arial');
        $dompdf->render();
        $dompdf->stream("Asistencia " . $mod . ".pdf", array('Attachment' => false));
    //SOLO HAY ESTUDIANTES SIN SECCIONES
} else if($reps==0 && count($data)>0){
    $html = '
        <html>
            <head>
                <meta charset="utf-8">
                <title>Asistencia' . $mod . '</title>
            </head>
            <style>
            h1{
                font-family: Arial, sans-serif;
                text-align: center;
                margin-top:50%;
                margin-bottom:60%;
            }
            .table-container {
                page-break-inside: avoid;
                margin: 10px auto;
                padding: 10px;
                border: 1px solid #868486;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                background-color:#dadada;
            }    
            </style>


            <body>
                <div class="table-container">
                    <h1>NO HAY SECCIONES EN EL MÓDULO: ' . $mod . '</h1
                </div>
            </body>
        </html>
    ';

    $dompdf = new Dompdf();


    $dompdf->loadHtml($html);
    $dompdf->setPaper('letter');
    //$dompdf->set_option('defaultFont','Arial');
    $dompdf->render();
    $dompdf->stream("Asistencia " . $mod . ".pdf", array('Attachment' => false));
} else {
    $html = '
        <html>
            <head>
                <meta charset="utf-8">
                <title>Asistencia' . $mod . '</title>
            </head>
            <style>
            h1{
                font-family: Arial, sans-serif;
                text-align: center;
                margin-top:50%;
                margin-bottom:60%;
            }
            .table-container {
                page-break-inside: avoid;
                margin: 10px auto;
                padding: 10px;
                border: 1px solid #868486;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                background-color:#dadada;
            }    
            </style>


            <body>
                <div class="table-container">
                    <h1>NO HAY ALUMNOS NI SECCIONES EN EL MÓDULO: ' . $mod . '</h1
                </div>
            </body>
        </html>
    ';

    $dompdf = new Dompdf();


    $dompdf->loadHtml($html);
    $dompdf->setPaper('letter');
    //$dompdf->set_option('defaultFont','Arial');
    $dompdf->render();
    $dompdf->stream("Asistencia " . $mod . ".pdf", array('Attachment' => false));
}

?>