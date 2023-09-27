<?php
require_once("../vendor/autoload.php");
require_once("class.conexion.php");
require_once("../recursos/consultas.php");
use Dompdf\Dompdf;

ob_start();

$mod = ($_GET['modulo']) ? $_GET['modulo'] : "";
//OBTENCION DE DATOS PARA EL PDF

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


$letra = "A";
if ($reps > 0) {
    $tamano = ceil(count($data) / $reps);
    $partes = array_chunk($data, $tamano);
}


//CREACION DEL PDF
$html = ob_get_clean();


if ($reps > 0 && count($data) > 0) {

    $html .= '
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <title>' . $mod . '</title>
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
                    padding: 8px;
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
                    <h1>REPORTE DE MODULO ' . $mod . '</h1>
                    <h2>Seccion "' . $letra . '"</h2>
                    <h3>Docente: ' . $docente . ' </h3>
                    <h3>Aula: ' . $salon . '</h3>
                    
                    </div>
                    


                    <table border="1">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                
                                <th>Estado</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                    ';
        foreach ($part as $estu) {
            $html .= '
                            <tr>
                                <td>' . $estu['id_estudiante'] . '</td>
                                <td>' . $estu['nombres'] . '</td>
                                <td>' . $estu['apellidos'] . '</td>
                                
                                <td>' . $estu['estado'] . '</td>
                                
                            </tr>
                        ';
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
    $dompdf->setPaper('letter');
    //$dompdf->set_option('defaultFont','Arial');
    $dompdf->render();
    $dompdf->stream("Secciones " . $mod . ".pdf", array('Attachment' => false));
} else if ($reps == 0 && count($data) > 0) {
    //EN EL CASO QUE NO HAYAN SECCIONES Y SOLO ESTUDIANTES EN EL MODULO, SE HARA ESTE REPORTE
    $html .= '
    <html>
        <head>
            <meta charset="utf-8">
            <title>' . $mod . '</title>
            
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
                    padding: 8px;
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


    $html .= '
                <div class="table-container">
                <h1>REPORTE DE MODULO ' . $mod . '</h1>
                <h2>INTEGRANTES DEL MODULO</h2>
                
                <table border="1">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            
                            <th>Estado</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                ';

    foreach ($data as $estu) {
        $html .= '
                        <tr>
                            <td>' . $estu['id_estudiante'] . '</td>
                            <td>' . $estu['nombres'] . '</td>
                            <td>' . $estu['apellidos'] . '</td>
                            
                            <td>' . $estu['estado'] . '</td>
                            
                        </tr>
                    ';
    }

    $letra = avanzarLetra($letra);

    $html .= '
                    </tbody>
                </table>
                </div>
            ';


    $html .= ' </body>
    </html>
';

    $dompdf = new Dompdf();


    $dompdf->loadHtml($html);
    $dompdf->setPaper('letter');
    //$dompdf->set_option('defaultFont','Arial');
    $dompdf->render();
    $dompdf->stream("Estudiantes " . $mod . ".pdf", array('Attachment' => false));

} else if ($reps == 0 && count($data) == 0) {
    $html = '
        <html>
            <head>
                <meta charset="utf-8">
                <title>' . $mod . '</title>
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
    $dompdf->stream("Modulo " . $mod . ".pdf", array('Attachment' => false));
}








?>