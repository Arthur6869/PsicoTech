import Swal from 'sweetalert2';

export const Loginandregister = (msg: string) => {
	return Swal.fire({
		icon: 'success',
		title: 'Sucesso',
		text: msg,
		timer: 2000,
		timerProgressBar: true,
	});
};

export const alertSuccess = (msg: string) => {
	return Swal.fire({
		icon: 'success',
		title: 'Sucesso',
		text: msg,
		timer: 2000,
		timerProgressBar: true,
	});
};

export const alertError = (msg: string) => {
	return Swal.fire({
		icon: 'error',
		title: 'Erro',
		text: msg,
		timer: 3000,
		timerProgressBar: true,
	});
};

export const alertConfirm = (msg: string) => {
	return Swal.fire({
		icon: 'warning',
		title: 'Confirmação',
		text: msg,
		showCancelButton: true,
		confirmButtonText: 'Sim',
		cancelButtonText: 'Cancelar',
		timer: 5000,
		timerProgressBar: true,
	});
};
