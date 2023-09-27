<?php
require_once('../fpdf/fpdf.php');
require_once("../modelo/class.conexion.php");

class PDF_MC_Table extends FPDF
{
var $widths;
var $aligns;

function SetWidths($w)
{
    //Set the array of column widths
    $this->widths=$w;
}

function SetAligns($a)
{
    //Set the array of column alignments
    $this->aligns=$a;
}

function Row($data)
{
    //Calculate the height of the row
    $nb=0;
    for($i=0;$i<count($data);$i++)
        $nb=max($nb,$this->NbLines($this->widths[$i],$data[$i]));
    $h=5*$nb;
    //Issue a page break first if needed
    $this->CheckPageBreak($h);
    //Draw the cells of the row
    for($i=0;$i<count($data);$i++)
    {
        $w=$this->widths[$i];
        $a=isset($this->aligns[$i]) ? $this->aligns[$i] : 'C';
        //Save the current position
        $x=$this->GetX();
        $y=$this->GetY();
        //Draw the border
        $this->Rect($x,$y,$w,$h);
        //Print the text
        $this->MultiCell($w,5,$data[$i],0,$a);
        //Put the position to the right of the cell
        $this->SetXY($x+$w,$y);
    }
    //Go to the next line
    $this->Ln($h);
}

function CheckPageBreak($h)
{
    //If the height h would cause an overflow, add a new page immediately
    if($this->GetY()+$h>$this->PageBreakTrigger)
        $this->AddPage($this->CurOrientation);
}

function NbLines($w,$txt)
{
    //Computes the number of lines a MultiCell of width w will take
    $cw=&$this->CurrentFont['cw'];
    if($w==0)
        $w=$this->w-$this->rMargin-$this->x;
    $wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
    $s=str_replace("\r",'',$txt);
    $nb=strlen($s);
    if($nb>0 and $s[$nb-1]=="\n")
        $nb--;
    $sep=-1;
    $i=0;
    $j=0;
    $l=0;
    $nl=1;
    while($i<$nb)
    {
        $c=$s[$i];
        if($c=="\n")
        {
            $i++;
            $sep=-1;
            $j=$i;
            $l=0;
            $nl++;
            continue;
        }
        if($c==' ')
            $sep=$i;
        $l+=$cw[$c];
        if($l>$wmax)
        {
            if($sep==-1)
            {
                if($i==$j)
                    $i++;
            }
            else
                $i=$sep+1;
            $sep=-1;
            $j=$i;
            $l=0;
            $nl++;
        }
        else
            $i++;
    }
    return $nl;
}
}
$todo = array();
$trabajador = array();
$ticket = array();

$todo = json_decode($_POST['data'], true);
$i = 0;

$trabajador = $todo[1];
$tickets = $todo[2];

foreach($trabajador as $persona){
    $nombre = $persona["Nombre"] . " " . $persona["Apellido"] ;
    $correo = $persona["Usuario"];
}

$i = count($tickets);

$pdf=new PDF_MC_Table();
$pdf->AddPage();
$pdf->SetFont('Arial','B',20);
$textypos = 5;
$pdf->Image("../media/logo.png",15, 8, 27, 30,"PNG");
$pdf->setY(12);
$pdf->setX(50);
// Agregamos los datos del consultorio medico
$pdf->Cell(5,$textypos,"REPORTE DE TICKETS");
$pdf->SetFont('Arial','B',8);
$pdf->setY(22);$pdf->setX(50);
$pdf->Cell(5,$textypos,"Trabajador:");
$pdf->SetFont('Arial','',8);
$pdf->setY(22);$pdf->setX(67);
$pdf->Cell(5,$textypos,$nombre);
$pdf->SetFont('Arial','B',8);
$pdf->setY(27);$pdf->setX(50);
$pdf->Cell(5,$textypos,"Correo institucional:");
$pdf->SetFont('Arial','',8);
$pdf->setY(27);$pdf->setX(79);
$pdf->Cell(5,$textypos,$correo);
$pdf->SetFont('Arial','B',8); 
$pdf->setY(32);$pdf->setX(50);
$pdf->Cell(5,$textypos,"Cantidad de tickets:");
$pdf->SetFont('Arial','',8);
$pdf->setY(32);$pdf->setX(78);
$pdf->Cell(5,$textypos,$i);

$pdf->SetFont('Arial','',8);
//Table with 20 rows and 4 columns
$pdf->setY(50);$pdf->setX(10);
$pdf->SetWidths(array(10,30,30,40,40,20,20));
srand(microtime()*1000000);
$pdf->Row(array("N.",utf8_decode("Título"),utf8_decode("Personal"),utf8_decode("Descripción"),"Comentario","Prioridad","Fecha"));
foreach($tickets as $ticket){
    $pdf->Row(array($ticket['Id_ticket'],utf8_decode($ticket['Titulo']),utf8_decode($ticket['Personal']),utf8_decode($ticket['Descripcion']),utf8_decode($ticket['Comentario']),utf8_decode($ticket['Prioridad']),$ticket['Fecha']));
}
ob_end_clean();
$pdf->Output('prueba.pdf','I', '8');


?>