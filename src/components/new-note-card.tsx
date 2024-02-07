import { ChangeEvent, FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export function NewNoteCard() {
	const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
	const [content, setContent] = useState('');

	function handleStartTyping() {
		setShouldShowOnBoarding(false);
	}

	function handleDisableTyping() {
		setShouldShowOnBoarding(true);
		setContent('');
	}

	function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		if(!event.target.value) {
			handleDisableTyping();
		}
		setContent(event.target.value);
	}

	function handleSaveNote(event: FormEvent) {
		event.preventDefault();

		if (!content) {
			return toast.error('Você não pode salvar uma nota vazia!');
		}

		toast.success('Nota criada com sucesso!');
	}

	return (
		<Dialog.Root onOpenChange={handleDisableTyping}>
			<Dialog.Trigger className="bg-slate-700 rounded-md p-5 text-left flex flex-col gap-3 hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
				<span className="text-sm font-medium text-slate-200">
				Adicionar nota
				</span>
				<p className="text-sm leading-6 text-slate-400">
				Grave uma nota em áudio que será convertida para texto automaticamente.
				</p>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="inset-0 fixed bg-black/50 backdrop-blur-sm">
					<Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col">
						<Dialog.Close className="absolute right-0 top-0 bg-slate-800 text-slate-400 p-1.5 hover:text-slate-300">
							<X className="size-5" />
						</Dialog.Close>

						<form onSubmit={handleSaveNote} className="flex flex-col flex-1">
							<div className="flex flex-1 flex-col gap-3 p-5">
								<span className="text-sm font-medium text-slate-300">
                Adicionar nota
								</span>
								{shouldShowOnBoarding ? (
									<p className="text-sm leading-6 text-slate-400 select-text">
                  Comece&nbsp;
										<button type="button" className="text-lime-400 hover:underline">gravando uma nota</button>
                  &nbsp;em áudio ou se preferir&nbsp;
										<button type="button" onClick={handleStartTyping} className="text-lime-400 hover:underline">utilize apenas texto</button>
                  .
									</p>
								) : (
									<textarea
										autoFocus
										value={content}
										onChange={handleContentChanged}
										className="text-sm leading-6 text-slate-400 bg-transparent resize-none h-full outline-none flex-1"
									/>
								)}
							</div>

							<button
								type="submit"
								disabled={shouldShowOnBoarding || !content}
								className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium outline-none hover:bg-lime-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
							>
              Salvar nota
							</button>
						</form>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
