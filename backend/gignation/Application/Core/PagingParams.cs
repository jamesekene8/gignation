using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
	public class PagingParams
	{
		private const int MaxpageSize = 50;

		public int PageNumber { get; set; } = 1;

		private int _pageSize = 10;

		public int PageSize
		{
			get => _pageSize;
			set => _pageSize = (value > MaxpageSize) ? MaxpageSize : value;
		}

	}
}
