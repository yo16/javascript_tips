// ����
function allReplace(text, sText, rText) {
	// �S�u������֐��B�itext�́AsText��rText�ɒu���j
	while (true) { // �������[�v�B
		dummy = text;
		text = dummy.replace(sText, rText); // �u���B
		if (text == dummy) {
			break;       // �u�����Ă��ω����Ȃ���΃��[�v�𔲂���B
		}
	}
	return text;  // �u����̕������Ԃ��ďI���B
}


// �ǂ������玝���Ă���
String.prototype.replaceAll = function( org, dest ){
	return this.replace(new RegExp(''+org, 'gi'), dest);
}

