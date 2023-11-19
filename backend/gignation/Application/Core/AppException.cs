﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
	public class AppException
	{
        public AppException(int statusCode, string message, string details = null)
        {
			StatusCode = statusCode;
			Message = message;
			Details = details;
		}

		public int StatusCode { get; }
		public string Message { get; }
		public string Details { get; }
	}
}
