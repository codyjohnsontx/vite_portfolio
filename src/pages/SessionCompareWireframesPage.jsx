import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../content/projects';
import {
  DIRECTION_A_HTML,
  DIRECTION_B_HTML,
} from '../content/sessionCompareWireframes';
import './SessionCompareWireframesPage.css';

export default function SessionCompareWireframesPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [direction, setDirection] = useState('A');

  if (!product || product.slug !== 'track-tuner') {
    return <Navigate to="/not-found" replace />;
  }

  const html = direction === 'A' ? DIRECTION_A_HTML : DIRECTION_B_HTML;

  return (
    <div className="fade-in">
      <div className="scw-page">
        <div className="scw-backbar">
          <Link to={`/products/${product.slug}/session-compare`}>← Back to Session Compare deck</Link>
          <span>Track Tuner / Session Compare / Wireframes</span>
        </div>

        <header className="scw-header">
          <h1 className="scw-title">Session Compare: Wireframe Storyboard</h1>
          <p className="scw-intro">
            Low-fi exploration for Track Tuner&rsquo;s manual-first, two-session comparison feature.
            Structure over polish. Two distinct product directions, with primary and secondary
            actions, empty and warning states, and PM rationale called out.
          </p>

          <div className="scw-tabs" role="group" aria-label="Wireframe direction">
            <button
              type="button"
              aria-pressed={direction === 'A'}
              className="scw-tab"
              onClick={() => setDirection('A')}
            >
              Direction A · Guided flow
            </button>
            <button
              type="button"
              aria-pressed={direction === 'B'}
              className="scw-tab"
              onClick={() => setDirection('B')}
            >
              Direction B · Single-scroll report
            </button>
          </div>

          <div className="scw-legend">
            <span>
              <span style={{ width: 26, height: 8, borderRadius: 4, background: '#e6e4df' }} />
              content / text
            </span>
            <span>
              <span
                style={{ width: 30, height: 16, border: '1.5px solid #bdbab1', borderRadius: 6 }}
              />
              button
            </span>
            <span>
              <span
                style={{
                  width: 30,
                  height: 16,
                  border: '1.5px solid #19a5b5',
                  background: '#d6eef1',
                  borderRadius: 6,
                }}
              />
              primary / faster
            </span>
            <span>
              <span
                style={{
                  width: 30,
                  height: 16,
                  border: '1.5px solid #c89042',
                  background: '#f6ecdb',
                  borderRadius: 6,
                }}
              />
              slower / warning
            </span>
            <span>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '2px solid #2b2b2b',
                }}
              />
              step
            </span>
            <span>
              <span
                style={{
                  width: 22,
                  height: 16,
                  border: '1.5px solid #d8d3c4',
                  borderLeft: '4px solid #19a5b5',
                  background: '#fffdf5',
                }}
              />
              annotation note
            </span>
          </div>
        </header>

        <div key={direction} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
