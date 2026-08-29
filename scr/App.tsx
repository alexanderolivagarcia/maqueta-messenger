import React, { useState } from 'react';
import { FloatingChatDock } from './components/FloatingChatDock';
import { MessageList } from './components/MessageList';
import { FloatingInputDrawer } from './components/FloatingInputDrawer';
import { LandscapeView } from './components/LandscapeView';
import { WhatsAppDoodleBackground } from './components/WhatsAppDoodleBackground';
import { INITIAL_CHATS } from './data/mockChats';
import { MessageType, Attachment, ChatMessage, ChatContact } from './types';
import {
  Stack,
  DeviceMobile,
  Monitor,
  CheckCircle,
  Eye,
  Sun,
  Moon,
  Columns,
  Rows,
} from '@phosphor-icons/react';

export default function App() {
  const [chats, setChats] = useState<ChatContact[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>('chat-1');
  const [activeType, setActiveType] = useState<MessageType>('Soporte');
  const [showSpecNotes, setShowSpecNotes] = useState<boolean>(true);
  const [layoutMode, setLayoutMode] = useState<'portrait' | 'landscape'>(
    'landscape'
  );
  const [viewMode, setViewMode] = useState<'fit' | 'mobile' | 'desktop'>('fit');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const isLight = theme === 'light';

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    const targetChat = chats.find((c) => c.id === id);
    if (targetChat) {
      setActiveType(targetChat.category);
    }
  };

  const handleSendMessage = (payload: {
    text: string;
    subject?: string;
    type: MessageType;
    attachment?: Attachment;
  }) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'outgoing',
      subject: payload.subject,
      typeTag: payload.type,
      text: payload.text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'read',
      attachment: payload.attachment,
    };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );
  };

  return (
    <div
      className={`min-h-screen w-screen flex flex-col items-center justify-between p-2 sm:p-4 md:p-6 overflow-hidden relative transition-colors duration-300 ${
        isLight
          ? 'bg-[#f4f4f5] text-zinc-900 selection:bg-zinc-300 selection:text-zinc-900'
          : 'bg-[#09090b] text-zinc-100 selection:bg-zinc-700 selection:text-white'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity ${
          isLight ? 'bg-blue-300/30' : 'bg-blue-900/15'
        }`}
      />
      <div
        className={`absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity ${
          isLight ? 'bg-zinc-300/40' : 'bg-zinc-800/30'
        }`}
      />
      <div
        className={`absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full blur-[140px] pointer-events-none transition-opacity ${
          isLight ? 'bg-sky-300/20' : 'bg-sky-600/10'
        }`}
      />

      {/* Global Background WhatsApp Doodle Wallpaper */}
      <WhatsAppDoodleBackground
        theme={theme}
        opacity={isLight ? 0.04 : 0.035}
        className="fixed inset-0"
      />

      {/* TOP BAR: Header & Viewport & Theme & Layout Controls */}
      <header className="w-full max-w-5xl mb-3 z-30 flex flex-wrap items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold shadow-xs backdrop-blur-md transition-colors ${
              isLight
                ? 'bg-white border-zinc-300 text-zinc-800 shadow-zinc-900/5'
                : 'bg-zinc-800 border-zinc-700 text-zinc-200'
            }`}
          >
            <Stack weight="duotone" className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1
              className={`text-xs sm:text-sm font-bold tracking-tight flex items-center gap-2 ${
                isLight ? 'text-zinc-900' : 'text-zinc-100'
              }`}
            >
              Módulo de Atención
              <span
                className={`text-[10px] font-medium border px-2 py-0.5 rounded-md ${
                  isLight
                    ? 'bg-white text-zinc-700 border-zinc-300 shadow-xs'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                }`}
              >
                {layoutMode === 'landscape'
                  ? 'Landscape (Panorámico)'
                  : 'Portrait (Compacto)'}
              </span>
            </h1>
            <p
              className={`text-[10px] ${
                isLight ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              Dock flotante transparente • Input flotante centrado • Textura WhatsApp
            </p>
          </div>
        </div>

        {/* CONTROLES: ORIENTACIÓN (PORTRAIT / LANDSCAPE), TEMA, DETALLES */}
        <div
          className={`flex items-center gap-1.5 backdrop-blur-md border p-1 rounded-xl shadow-xs transition-colors ${
            isLight
              ? 'bg-white/90 border-zinc-200 shadow-zinc-900/5'
              : 'bg-zinc-900/80 border-zinc-800'
          }`}
        >
          {/* SELECTOR DE MODO: 1. PORTRAIT / 2. LANDSCAPE */}
          <div
            className={`flex items-center p-0.5 rounded-lg border ${
              isLight
                ? 'bg-zinc-100/90 border-zinc-200'
                : 'bg-zinc-950/80 border-zinc-800'
            }`}
          >
            <button
              onClick={() => setLayoutMode('portrait')}
              id="btn-mode-portrait"
              title="Versión 1: Portrait (Flotante vertical)"
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                layoutMode === 'portrait'
                  ? isLight
                    ? 'bg-white text-zinc-900 border border-zinc-300 shadow-xs font-semibold'
                    : 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-xs font-semibold'
                  : isLight
                  ? 'text-zinc-500 hover:text-zinc-900'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Rows weight="duotone" className="w-3.5 h-3.5" />
              <span>1. Portrait</span>
            </button>

            <button
              onClick={() => setLayoutMode('landscape')}
              id="btn-mode-landscape"
              title="Versión 2: Landscape (2 Paneles divididos)"
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                layoutMode === 'landscape'
                  ? isLight
                    ? 'bg-white text-zinc-900 border border-zinc-300 shadow-xs font-semibold'
                    : 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-xs font-semibold'
                  : isLight
                  ? 'text-zinc-500 hover:text-zinc-900'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Columns weight="duotone" className="w-3.5 h-3.5" />
              <span>2. Landscape</span>
            </button>
          </div>

          <div
            className={`h-3.5 w-[1px] ${
              isLight ? 'bg-zinc-200' : 'bg-zinc-800'
            }`}
          />

          {/* THEME SWITCHER */}
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            id="btn-toggle-theme"
            title={isLight ? 'Cambiar a Tema Oscuro' : 'Cambiar a Tema Claro'}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              isLight
                ? 'bg-zinc-100 text-zinc-900 border border-zinc-300 hover:bg-zinc-200/80'
                : 'bg-zinc-800 text-amber-300 border border-zinc-700 hover:bg-zinc-700/80'
            }`}
          >
            {isLight ? (
              <>
                <Sun weight="duotone" className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Claro</span>
              </>
            ) : (
              <>
                <Moon weight="duotone" className="w-3.5 h-3.5 text-blue-300" />
                <span className="hidden sm:inline">Oscuro</span>
              </>
            )}
          </button>

          <div
            className={`h-3.5 w-[1px] ${
              isLight ? 'bg-zinc-200' : 'bg-zinc-800'
            }`}
          />

          <button
            onClick={() => setShowSpecNotes(!showSpecNotes)}
            title="Mostrar / Ocultar Detalles"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              showSpecNotes
                ? isLight
                  ? 'bg-zinc-100 text-zinc-900 border border-zinc-300 shadow-xs'
                  : 'bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-xs'
                : isLight
                ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Eye weight="duotone" className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Detalles</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main
        className={`relative transition-all duration-300 ${
          layoutMode === 'landscape'
            ? 'w-full max-w-4xl lg:max-w-5xl h-[86vh] sm:h-[88vh]'
            : viewMode === 'mobile'
            ? 'w-full max-w-sm h-[86vh]'
            : 'w-full max-w-2xl h-[86vh] sm:h-[88vh]'
        } rounded-[28px] sm:rounded-[32px] overflow-hidden backdrop-blur-xl flex flex-col ${
          isLight
            ? 'bg-[#e8ebf0] border border-zinc-300/80 shadow-2xl ring-1 ring-black/5'
            : 'bg-[#0b1019] border border-zinc-800 shadow-2xl ring-1 ring-white/5'
        }`}
      >
        {/* Authentic WhatsApp Doodle Texture Layer */}
        <WhatsAppDoodleBackground
          theme={theme}
          opacity={isLight ? 0.08 : 0.06}
          className="absolute inset-0"
        />

        {layoutMode === 'landscape' ? (
          /* ========================================================= */
          /* VERSIÓN 2: LANDSCAPE (SIDEBAR FLOTANTE GLASS + CHAT DEDICADO) */
          /* ========================================================= */
          <LandscapeView
            chats={chats}
            activeChat={activeChat}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            activeType={activeType}
            onChangeType={setActiveType}
            onSendMessage={handleSendMessage}
            theme={theme}
          />
        ) : (
          /* ========================================================= */
          /* VERSIÓN 1: PORTRAIT (DOCK FLOTANTE SUPERIOR + INPUT FLOTANTE) */
          /* ========================================================= */
          <>
            {/* 1. DOCK FLOTANTE SUPERIOR: CHATS */}
            <FloatingChatDock
              chats={chats}
              activeChatId={activeChatId}
              onSelectChat={handleSelectChat}
              theme={theme}
            />

            {/* 2. ÁREA DE MENSAJES (SCROLLABLE PASANDO POR DEBAJO) */}
            <MessageList chat={activeChat} theme={theme} layout="portrait" />

            {/* 3. CAJÓN DE ENTRADA / INPUT FLOTANTE */}
            <FloatingInputDrawer
              activeType={activeType}
              onChangeType={setActiveType}
              onSendMessage={handleSendMessage}
              theme={theme}
              variant="floating"
            />
          </>
        )}
      </main>

      {/* FOOTER SPECS SUMMARY ACCORDION */}
      {showSpecNotes && (
        <footer className="w-full max-w-5xl mt-2 z-20">
          <div
            className={`border backdrop-blur-md rounded-xl px-4 py-2 text-[11px] flex flex-wrap items-center justify-between gap-2 shadow-xs transition-colors ${
              isLight
                ? 'bg-white/90 border-zinc-200 text-zinc-600'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 font-medium ${
                isLight ? 'text-zinc-800' : 'text-zinc-200'
              }`}
            >
              <CheckCircle
                weight="duotone"
                className="w-3.5 h-3.5 text-emerald-500"
              />
              <span className={isLight ? 'text-zinc-900' : 'text-zinc-100'}>
                {layoutMode === 'landscape'
                  ? 'Versión 2: Landscape (2 Paneles)'
                  : 'Versión 1: Portrait (Flotante)'}
                :
              </span>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar text-[10px]">
              {layoutMode === 'landscape' ? (
                <>
                  <span
                    className={isLight ? 'text-zinc-700' : 'text-zinc-300'}
                  >
                    • Panel 1: Área de chat con ancho máx. por burbuja
                    (ergonómico)
                  </span>
                  <span
                    className={isLight ? 'text-zinc-700' : 'text-zinc-300'}
                  >
                    • Panel 2: Bandeja vertical de casos con búsqueda y filtros
                  </span>
                  <span
                    className={isLight ? 'text-zinc-700' : 'text-zinc-300'}
                  >
                    • Input integrado en la base del panel lateral
                  </span>
                </>
              ) : (
                <>
                  <span
                    className={isLight ? 'text-zinc-700' : 'text-zinc-300'}
                  >
                    • Dock flotante superior con avatares translúcidos
                  </span>
                  <span
                    className={isLight ? 'text-zinc-700' : 'text-zinc-300'}
                  >
                    • Paso de mensajes scrollable por debajo del dock e input
                  </span>
                  <span
                    className={isLight ? 'text-zinc-700' : 'text-zinc-300'}
                  >
                    • Cajón flotante inferior con asunto y anexos unificados
                  </span>
                </>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

