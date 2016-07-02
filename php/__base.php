<?php
/**
 * Created by PhpStorm.
 * User: lzsn
 * Date: 2016/7/1 0001
 * Time: 9:20
 */

require_once '../lib/phpexcel/Classes/PHPExcel.php';

$filename = "../excel/dataFilled.xlsx";

$tableNames = ["DC1-TG现状配置表","DC1-SS现状配置表", "DC1-TG扩容需求表", "DC1-SS扩容需求表"];
$PHPReader = new PHPExcel_Reader_Excel2007();
$objPHPExcel = PHPExcel_IOFactory::load($filename);
$sheetNames  = $PHPReader->listWorksheetNames($filename);

