import { useNavigate, useParams } from 'react-router-dom';
import { PanchangSubTabs, type PanchangSubView } from './components/PanchangSubTabs';
import { DailyPanchangContent } from './DailyPanchangView';
import { FestivalsView } from './FestivalsView';

export function PanchangView() {
  const { sub } = useParams<{ sub?: string }>();
  const navigate = useNavigate();

  // Default to 'today' when no sub-route
  const subView: PanchangSubView = sub === 'festivals' ? 'festivals' : 'today';

  const handleChange = (next: PanchangSubView) => {
    if (next === 'today') {
      navigate('/panchang');
    } else {
      navigate(`/panchang/${next}`);
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 pt-6">
        <PanchangSubTabs view={subView} onChange={handleChange} />
      </div>
      {subView === 'today' && <DailyPanchangContent />}
      {subView === 'festivals' && <FestivalsView />}
    </>
  );
}