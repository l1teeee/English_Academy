<?php

require_once("../vendor/autoload.php");
require_once("class.conexion.php");
require_once("../recursos/consultas.php");
use Dompdf\Dompdf;

ob_start();

$mod = ($_GET['modulo']) ? $_GET['modulo'] : "";

$db = new Conexion();
$modelo = $db->get_conexion();

$stmt = $modelo->prepare("SELECT * FROM estudiante WHERE modulo = ? ORDER BY seccion");
$stmt->bindParam(1, $mod, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt->closeCursor();

$veces = $modelo->prepare("SELECT * FROM seccion WHERE modulo = ?");
$veces->bindParam(1, $mod, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
$veces->execute();
$reps = $veces->rowCount();
$dataSeccion = $veces->fetchAll(PDO::FETCH_ASSOC);
//$salon = $dataSeccion[0]['salon'];

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

//CREACION DEL PDF
$html = ob_get_clean();

if ($reps > 0 && count($data) > 0) {

    $html .= '
        <html>
            <head>
                <meta charset="utf-8">
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <title>GradeBook ' . $mod . '</title>
            </head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }

                h1 {
                    text-align: center;
                    margin: 10px 0;
                }

                h2 {
                    font-size:20px;
                }

                h3 {
                    font-size:16px;
                }

                h5 {
                    font-size:15px;
                }    

                .table-container {
                    page-break-inside: avoid;
                    margin: 10px auto;
                    padding: 10px;
                    border: 1px solid #868486;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                #Titulo{
                    text-align:center;
                }    

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th{
                    padding: 2.8px;
                    text-align: center;
                    border: 1px solid #ccc;
                    color:#ffff;
                    background-color: #1a56db;
                    font-weight: bold;
                    font-size:15px;
                }   

                td {
                    padding: 6px;
                    text-align: center;
                    border: 1px solid #ccc;
                    font-size: 13px;
                }

                

                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                
                .row-container{
                    padding-bottom:10px;
                }
            </style>
            <body>
    ';
    $i = 0;
    foreach ($partes as $part) {

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


        $html .= '
                    <div class="table-container">
                        <div class="menu">
                            <h1>English Academy ' . $anoactual . '</h1>
                            <h2 id="Titulo">  '.$mod .' | Sección "' . $letra . '"</h2>
                            <h3>Docente: ' . $docente . ' </h3>
                            <h3>Aula: ' . $salon . '</h3>
                            <div class="row-container">
                                <div class="from">From:</div>
                                <div class="to">To:</div>
                            </div>
                        </div>
                    
                    <table>
                    <thead>
                        <tr>
                            <th rowspan="2">N°</th>
                            <th rowspan="2">Student\'s Name</th>
                            <th colspan="4">QUIZ 1</th>
                            <th rowspan="2">Oral Evaluation 1 - (25%)</th>
                            <th colspan="4">QUIZ 2</th>
                            <th rowspan="2">Oral Evaluation 2 - (25%)</th>
                            <th rowspan="2">Average</th>
                        </tr>
                        <tr>
                            <th>Listening (10%)</th>
                            <th>Reading (5%)</th>
                            <th>Grammar (5%)</th>
                            <th>Writing (5%)</th>
                            <th>Listening (10%)</th>
                            <th>Reading (5%)</th>
                            <th>Grammar (5%)</th>
                            <th>Writing (5%)</th>
                        </tr>
                    </thead>
                        <tbody>
                        ';
        $cant = 1;
        foreach ($part as $estu) {
            $html .= '
                            <tr>
                                <td>' . $cant . '</td>
                                <td>' . $estu['nombres'] . ' ' . $estu['apellidos'] . '</td>
                                <td></td>
                                <td></td>
                                <td></td>
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
            $cant++;
        }
        $letra = avanzarLetra($letra);

        $html .= '
                        </tbody>
                    </table>
                    </div>
                    ';
        $i++;
    }
    $html .= ' 
            </body>
        </html>
    ';

    $dompdf = new Dompdf();
    $dompdf->setPaper('letter', 'landscape');
    $dompdf->loadHtml($html);

    //$dompdf->set_option('defaultFont','Arial');
    $dompdf->render();
    $dompdf->stream("GradeBook " . $mod . ".pdf", array('Attachment' => false));
} else {
    $html = '
        <html>
            <head>
                <meta charset="utf-8">
                <title> GradeBook ' . $mod . '</title>
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
                margin: 30px auto;
                padding: 10px;
                border: 1px solid #868486;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                background-color:#dadada;
            }    
            </style>


            <body>
                <div class="table-container">
                    <h1>NO HAY ALUMNOS EN EL MÓDULO: ' . $mod . '</h1
                </div>
            </body>
        </html>
    ';

    $dompdf = new Dompdf();


    $dompdf->loadHtml($html);
    $dompdf->setPaper('letter');
    //$dompdf->set_option('defaultFont','Arial');
    $dompdf->render();
    $dompdf->stream("GradeBook " . $mod . ".pdf", array('Attachment' => false));
}

?>