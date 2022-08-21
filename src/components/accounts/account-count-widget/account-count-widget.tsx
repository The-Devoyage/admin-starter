import { cilOptions } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CSpinner,
  CWidgetStatsA,
} from '@coreui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FC, useState } from 'react';
import { Stats } from 'src/types/generated';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

interface AccountCountWidgetProps {
  stats?: Stats;
  loading: boolean;
}

export const AccountCountWidget: FC<AccountCountWidgetProps> = ({
  stats,
  loading,
}) => {
  const [showAxes, setShowAxes] = useState(true);
  const navigate = useNavigate();

  return (
    <CWidgetStatsA
      className="mb-4"
      color="warning"
      value={`${stats?.total ?? 0} New Accounts`}
      title="This Year"
      action={
        <CDropdown alignment="end">
          <CDropdownToggle color="transparent" caret={false} className="p-0">
            <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => navigate("/accounts")} role="button">Manage Accounts</CDropdownItem>
            <CDropdownItem active={showAxes} onClick={() => setShowAxes(!showAxes)} role="button">Show Axes</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      }
      chart={
        !loading ? (
          <Line
            className="p-3"
            data={{
              labels,
              datasets: [
                {
                  label: 'Accounts',
                  data: labels.map(
                    (_, idx) =>
                      stats?.history?.find((h) => h._id?.MONTH === idx + 1)
                        ?.total ?? 0,
                  ),
                  borderColor: 'rgba(255,255,255, 0.7)',
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                xAxes: { display: showAxes, grid: { color: "rgba(255, 255, 255, 0.3)" }, ticks: { color: "white" } },
                yAxes: { display: showAxes, grid: { color: "rgba(255, 255, 255, 0.3)" }, ticks: { color: "white" } },


              },
              plugins: { legend: { display: false } },
            }}
          />
        ) : (
          <CContainer
            className="d-flex justify-content-center align-items-center"
            style={{ height: 200 }}
          >
            <CSpinner />
          </CContainer>
        )
      }
    />
  );
};
