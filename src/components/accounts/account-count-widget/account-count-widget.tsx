import { cilOptions } from '@coreui/icons';
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
import { useGetAccountsContext } from 'src/apollo/providers/accounts/queries';

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

export const AccountCountWidget = () => {
  const { stats, loading } = useGetAccountsContext();

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
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
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
                xAxes: { display: false },
                yAxes: { display: false },
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
