<?php
/**
 * Created by PhpStorm.
 * User: lzsn
 * Date: 2016/7/3 0003
 * Time: 8:31
 */

require_once "extractExcel.php";

$data = null;

$tabel = $_GET['table'];

switch ($tabel){
    case "DC1_TG_config" :
        $data = deal_DC1_TG_config(false);
        break;
    case "DC1_TG_expand" :
        $data = deal_DC1_TG_expand(false);
        break;
    case "DC1_SS_config" :
        $data = deal_DC1_SS_config(false);
        break;
    case "DC1_SS_expand" :
        $data = deal_DC1_SS_expand(false);
        break;
    default:
        break;
}

echo json_encode($data);