// �O�ɒ�`�����֐�

function outerAlert(msg){
	alert(msg);
}


// �O���t�@�C����ǂނ��Ƃ������Œ�`���邽�߂ɁA
// script�G�������g��body�֒ǉ�
if (document.createElement) window.onload = function() {
	var ele = document.createElement("script");		// �V�K�ɗv�f�i�^�O�j�𐶐�
	ele.setAttribute("src", "include.js");
	document.body.appendChild(ele);					// ���̃y�[�W (document.body) �̍Ō�ɐ��������v�f��ǉ�
}

