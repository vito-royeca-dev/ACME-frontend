interface DataTableProps<T> {
  data: T[];
  columns: { key: keyof T, label: string }[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
}

const DataTable = <T extends { id: string }>({ data, columns, onEdit, onDelete }: DataTableProps<T>) => (
  <table className="min-w-full bg-white">
    <thead className="bg-gray-800 text-white">
      <tr>
        {columns.map((column) => (
          <th key={String(column.key)} className="py-2 px-4 border-b border-gray-200 text-left">{column.label}</th>
        ))}
        <th className="py-2 px-4 border-b border-gray-200">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id} className="hover:bg-gray-100">
          {columns.map((column) => (
            <td key={String(column.key)} className="py-2 px-4 border-b border-gray-200">{String(item[column.key])}</td>
          ))}
          <td className="py-2 px-4 border-b border-gray-200">
            <button onClick={() => onEdit(item)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
            <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;
