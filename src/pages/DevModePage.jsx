import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getDevModeCommands,
  getDevModeSuggestions,
  runDevModeCommand,
} from '../content/devModeCommands';

const bootLines = [
  'loading profile data',
  'mounting product evidence',
  'hydrating case studies',
  'console ready',
];

function OutputBlock({ entry }) {
  return (
    <article className="dev-terminal__entry">
      <div className="dev-terminal__prompt-line">
        <span className="dev-terminal__prompt">cj@portfolio</span>
        <span className="dev-terminal__path">~/dev-mode</span>
        <span className="dev-terminal__dollar">$</span>
        <span>{entry.command}</span>
      </div>
      <div className="dev-output">
        <h2>{entry.output.title}</h2>
        {entry.output.intro ? <p>{entry.output.intro}</p> : null}
        {entry.output.sections.map((section) => (
          <section key={section.label} className="dev-output__section">
            <h3>{section.label}</h3>
            <ul>
              {section.items.map((it, index) => (
                <li
                  key={`${section.label}-${index}`}
                  className={it.title ? undefined : 'dev-output__prose'}
                >
                  {it.title ? (
                    <span className="dev-output__item-title">{it.title}</span>
                  ) : null}
                  {it.meta || it.body ? (
                    <div className="dev-output__detail">
                      {it.meta ? <span className="dev-output__meta">{it.meta}</span> : null}
                      {it.body ? <span className="dev-output__body">{it.body}</span> : null}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
        {entry.output.links.length > 0 ? (
          <div className="dev-output__links" aria-label={`${entry.command} links`}>
            {entry.output.links.map((link) =>
              link.href.startsWith('http') || link.href.startsWith('mailto:') || link.href.endsWith('.pdf') ? (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={`${link.label}-${link.href}`} to={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

OutputBlock.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    command: PropTypes.string.isRequired,
    output: PropTypes.shape({
      title: PropTypes.string.isRequired,
      intro: PropTypes.string,
      sections: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          items: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              body: PropTypes.string,
              meta: PropTypes.string,
            }),
          ).isRequired,
        }),
      ).isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
          external: PropTypes.bool,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default function DevModePage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [bootComplete, setBootComplete] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const suggestions = useMemo(getDevModeSuggestions, []);
  const allCommands = useMemo(getDevModeCommands, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setBootComplete(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history.length, bootComplete]);

  useEffect(() => {
    const scrollNode = scrollRef.current;
    if (!scrollNode) return;
    if (typeof scrollNode.scrollTo === 'function') {
      scrollNode.scrollTo({ top: scrollNode.scrollHeight, behavior: 'smooth' });
      return;
    }
    scrollNode.scrollTop = scrollNode.scrollHeight;
  }, [history.length, bootComplete]);

  function execute(commandValue) {
    const command = commandValue.trim();
    if (!command) return;

    if (command.toLowerCase() === 'exit') {
      navigate('/');
      return;
    }

    if (command.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    setHistory((current) => [
      ...current,
      {
        id: Date.now() + current.length,
        command,
        output: runDevModeCommand(command),
      },
    ]);
    setInput('');
  }

  return (
    <div className="dev-mode-shell fade-in">
      <section className="dev-terminal" aria-labelledby="dev-mode-title">
        <header className="dev-terminal__bar">
          <div className="dev-terminal__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <p className="dev-terminal__kicker">Cody Johnson / developer console</p>
            <h1 id="dev-mode-title">Dev Mode</h1>
          </div>
          <Link className="dev-terminal__exit" to="/">
            exit
          </Link>
        </header>

        <div className="dev-terminal__body" ref={scrollRef} onClick={() => inputRef.current?.focus()}>
          <div className="dev-boot" aria-label="boot sequence">
            {bootLines.map((line, index) => (
              <div key={line} className="dev-boot__line" style={{ '--line-index': index }}>
                <span className="dev-line-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="dev-boot__status">ok</span>
                <span>{line}</span>
              </div>
            ))}
          </div>

          <div className="dev-terminal__intro">
            <p>
              Hiring-manager console for product proof, role history, stack, and contact paths.
              Type <kbd>help</kbd> or choose a suggested command.
            </p>
            <div className="dev-suggestions" aria-label="suggested commands">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => execute(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {history.map((entry) => (
            <OutputBlock key={entry.id} entry={entry} />
          ))}

          <form
            className={`dev-command ${bootComplete ? 'is-ready' : ''}`}
            onSubmit={(event) => {
              event.preventDefault();
              execute(input);
            }}
          >
            <label className="sr-only" htmlFor="dev-command-input">
              Dev Mode command
            </label>
            <span className="dev-terminal__prompt">cj@portfolio</span>
            <span className="dev-terminal__path">~/dev-mode</span>
            <span className="dev-terminal__dollar">$</span>
            <input
              ref={inputRef}
              id="dev-command-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              list="dev-mode-commands"
              autoComplete="off"
              spellCheck="false"
              placeholder="help"
            />
            <datalist id="dev-mode-commands">
              {allCommands.map((command) => (
                <option key={command} value={command} />
              ))}
            </datalist>
          </form>
        </div>
      </section>
    </div>
  );
}
