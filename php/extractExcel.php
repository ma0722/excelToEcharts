<?php

	include_once '__base.php';

	$startRow = 'A';
	$startCol= 0;

	$excelInfo = array();

	/*
	 * 根据表格名字获取表格对象
	 */
	function getSheel($sheetName){
		global $objPHPExcel;
		if( empty($objPHPExcel->sheetNameExists($sheetName)) )
			return null;
		$sheet = $objPHPExcel->getSheetByName($sheetName);
		return $sheet;
	}

	/*
	 * 解析DC1-TG现表状配置
	 */
	function deal_DC1_TG_config(){
		$sheetName = "DC1-TG扩容需求表";
		$sheet = getSheel($sheetName);
		if (empty($sheet))
			return null;
		$data = array();
		$highestCol = $sheet->getHighestColumn();
		$highestRow = $sheet->getHighestRow();
		$startCol = "A";
		$startRow = 3;


		for ($row = $startRow; $row <= $highestRow; $row++) {
			$col = $startCol;
			$data[] = [
				"省份" =>  $sheet->getCell($col.$row)->getValue(),
				"DC1_TG1" => $sheet->getCell(++$col.$row)->getValue(),
				"DC1_TG2" => $sheet->getCell(++$col.$row)->getValue()];
		}
		return $data;
	}

	/*
	 * 解析DC1-SS现表状配置
	 */
	function deal_DC1_SS_config(){
		$sheetName = "DC1-SS现状配置表";
		$sheet = getSheel($sheetName);
		if (empty($sheet))
			return null;
		$data = array();
		$highestCol = $sheet->getHighestColumn();
		$highestRow = $sheet->getHighestRow();
		$startCol = "A";
		$startRow = 4;
		for ($row = $startRow; $row <= $highestRow; $row++) {
			$col = $startCol;
			$data[] = [
				"局点" => $sheet->getCell($col.$row)->getValue(),
				"板卡数量（主用+备用）" =>  $sheet->getCell(++$col.$row)->getValue(),
				"固网电路域" =>  $sheet->getCell(++$col.$row)->getValue(),
				"移动电路域(与固网电路域合并）" =>  $sheet->getCell(++$col.$row)->getValue(),
				"扁平化HSS之间" =>  $sheet->getCell(++$col.$row)->getValue(),
				"电路域HSS之间" =>  $sheet->getCell(++$col.$row)->getValue(),
				"固网扁平化LSS" =>  $sheet->getCell(++$col.$row)->getValue(),
				"ECP呼叫" =>  $sheet->getCell(++$col.$row)->getValue(),
				"C网扁平化TMSCe" =>  $sheet->getCell(++$col.$row)->getValue(),
				"备用板卡数(容灾）" =>  $sheet->getCell(++$col.$row)->getValue(),
				"空闲" =>  $sheet->getCell(++$col.$row)->getValue(),
			];
		}
		return $data;
	}

	/*
	 * 解析DC1-TG扩容需求表
	 */
	function deal_DC1_TG_expand(){
		$sheetName = "DC1-TG扩容需求表";
		$sheet = getSheel($sheetName);
		if (empty($sheet))
			return null;
		$data = array();
		$highestCol = $sheet->getHighestColumn();
		$highestRow = $sheet->getHighestRow();
		$startCol = "A";
		$startRow = 3;

		$mergeCells = array_values($sheet->getMergeCells());
		for ($i = 0; $i < 4; $i++) {
			$tmp = explode(":", $mergeCells[$i]);
			$res = array();
			for($char = substr($tmp[0], 0 , 1); $char <= substr($tmp[1], 0 , 1); $char++){
				$res[] = $sheet->getCell($char.'2')->getValue();
			}
			$mergeCells[$i] = $res;
		}

		$expand = [
			"DC1 TG1总中继需求"=>$mergeCells[0],
			"DC1 TG2总中继需求" => $mergeCells[1],
			"DC1 TG1扩容中继" => $mergeCells[2],
			"DC1 TG2扩容中继" => $mergeCells[3]
		];

		for ($row = $startRow; $row <= $highestRow; $row++) {
			$col = $startCol;
			$tmp = [
				"省份" => $sheet->getCell($col.$row)->getValue(),
				"DC1TG1可用中继" =>  $sheet->getCell(++$col.$row)->getValue(),
				"DC1TG2可用中继" =>  $sheet->getCell(++$col.$row)->getValue(),
			];

			$DC1_TG1 = array();
			for ($i = 0; $i < count($expand["DC1 TG1总中继需求"]); $i++) {
				$DC1_TG1[$expand["DC1 TG1总中继需求"][$i]]= $sheet->getCell(++$col.$row)->getValue();
			}
			$tmp["DC1 TG1总中继需求"] = $DC1_TG1;

			$DC1_TG2 = array();
			for ($i = 0; $i < count($expand["DC1 TG2总中继需求"]); $i++) {
				$DC1_TG2[$expand["DC1 TG2总中继需求"][$i]]= $sheet->getCell(++$col.$row)->getValue();
			}
			$tmp["DC1 TG2总中继需求"] = $DC1_TG2;

			$DC1_TG1_expand = array();
			for ($i = 0; $i < count($expand["DC1 TG1扩容中继"]); $i++) {
				$DC1_TG1_expand[$expand["DC1 TG1扩容中继"][$i]]= $sheet->getCell(++$col.$row)->getValue();
			}
			$tmp["DC1 TG1扩容中继"] = $DC1_TG1_expand;

			$DC1_TG2_expand = array();
			for ($i = 0; $i < count($expand["DC1 TG2扩容中继"]); $i++) {
				$DC1_TG2_expand[$expand["DC1 TG2扩容中继"][$i]]= $sheet->getCell(++$col.$row)->getValue();
			}
			$tmp["DC1 TG2扩容中继"] = $DC1_TG2_expand;

			$data[] = $tmp;
		}
		echo json_encode($data);
		return $data;
	}

	/*
	 * 解析DC1-SS扩容需求表
	 */
	function deal_DC1_SS_expand(){
		$sheetName = "DC1-SS扩容需求表";
		$sheet = getSheel($sheetName);
		if (empty($sheet))
			return null;
		$data = array();
		$highestCol = $sheet->getHighestColumn();
		$highestRow = $sheet->getHighestRow();
		$startCol = "A";
		$startRow = 2;
		//获取列名
		$colNames = array();
		for ($col = $startCol; $col <= $highestCol; $col++) {
			$colName = $sheet->getCell($col.'1')->getCalculatedValue();
			$colNames[] = $colName;
		}
		for ($row = $startRow; $row <= $highestRow; $row++) {
			$col = $startCol;
			$tmp = array();
			for ($i = 0; $i < count($colNames); $i++ ){
				$tmp[$colNames[$i]] =  $sheet->getCell($col.$row)->getValue();
				$col++;
			}
			$data[] = $tmp;
		}
		echo json_encode($data);
		return $data;
	}

?>
